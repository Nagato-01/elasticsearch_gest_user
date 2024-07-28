import winston from 'winston';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';

const esClient = new ElasticsearchClient({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'J7TXh3yQ_X3WTTPraxfu'
    }
});

class CustomElasticsearchTransport extends winston.Transport {
    constructor(opts) {
        super(opts);
        this.client = opts.client;
        this.indexPrefix = opts.indexPrefix;
    }

    log(info, callback) {
        setTimeout(() => {
            this.emit('logged', info);
        }, 0);

        const logData = {
            '@timestamp': new Date().toISOString(),
            severity: info.level,
            message: info.message,
            fields: info.meta
        };

        const indexName = `${this.indexPrefix}-${new Date().toISOString().split('T')[0]}`;

        this.client.index({
            index: indexName,
            body: logData
        })
        .then(() => {
            callback();
        })
        .catch((error) => {
            console.error('Error indexing log to Elasticsearch:', error);
            callback(error);
        });
    }
}

const esTransportOpts = {
    level: 'info',
    client: esClient,
    indexPrefix: 'nodejs-logs'
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'application.log' }),
        new CustomElasticsearchTransport(esTransportOpts)
    ]
});

export default logger;