const config = require('config');
const express = require('express');
const router = require('./routes/index');

const app = express();

app.use('/api', router);

app.listen(config.httpPort, () => {
    console.log(`Express server listening on port ${config.httpPort}...`);
});

module.exports = app;
