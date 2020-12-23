const express = require('express');
const router = require('./routes/index');

const app = express();

app.use('/api', router);

app.listen(3000);

module.exports = app;
