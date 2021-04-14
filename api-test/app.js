const config = require('config');
const express = require('express');

const router = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/api', router);

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
})

app.listen(config.httpPort, () => {
    console.log(`Express server listening on port ${config.httpPort}...`);
});

module.exports = app;
