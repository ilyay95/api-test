const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');
const connectionsValidation = require('../routes/validations/connections');
const asyncHandler = require('express-async-handler');
const Connects = require('../models').connections;

router.delete('/:id', validate(connectionsValidation.delete), asyncHandler(async (req, res) => {
    const user = await Connects.findByPk(req.params.id);

    if (!user) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    try {
        await user.destroy();

        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
        res.status(StatusCodes.NO_CONTENT).send({ error });
    }
}));

router.post('/', validate(connectionsValidation.post), asyncHandler(async (req, res) => {
    const { groupId, userId } = req.body.user;

    try {
        const user = await Connects.create({ groupId, userId });

        res.send({ user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
}));

module.exports = router;
