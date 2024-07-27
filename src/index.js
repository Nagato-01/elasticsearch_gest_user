import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes.js';
import logger from './logger.js';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/users', userRoutes);

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});

export default app;