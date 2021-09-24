const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');
const connectionsValidation = require('../routes/validations/connections');
const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const Connects = require('../models').connections;

router.delete('/:id', validate(connectionsValidation.delete), asyncHandler(async (req, res) => {
    const connection = await Connects.findByPk(req.params.id);

    if (!connection) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    try {
        await connection.destroy();

        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
        res.status(StatusCodes.NO_CONTENT).send({ error });
    }
}));

router.post('/', validate(connectionsValidation.post), asyncHandler(async (req, res) => {
    const { groupId, userId } = req.body.connection;

    try {
        const connection = await Connects.create({ groupId, userId });

        res.send({ connection });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
}));

module.exports = router;
