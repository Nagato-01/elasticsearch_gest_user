import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes.js';
import logger from './logger.js';

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    });
    next();
});

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
    console.log("test");
    logger.error(`${req.method} ${req.url} - ${err.message}`);
    res.status(500).json({ error: err.message });
    next();
});

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
    console.log(`Server is running on http://localhost:${port}`);
});

logger.info('Je test mes logs');

export default app;
