const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes');
const logger = require('./logger');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/users', userRoutes);

// Middleware pour les logs
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.listen(port, () => {
    logger.info(`Mon serveur tourne sur le port http://localhost:${port}`);
});

module.exports = app;
