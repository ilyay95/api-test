const config = require('./config');
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('express-validation');
const router = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/api', router);

app.use(function (err, req, res) {
    console.log(err);

    if (err instanceof ValidationError) {
        return res.status(err.statusCode).send(err)
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
})

app.listen(config.httpPort, () => {
    console.log(`Express server listening on port ${config.httpPort}...`);
});

module.exports = app;
