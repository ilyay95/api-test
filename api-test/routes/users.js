const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { validate } = require('express-validation');
const asyncHandler = require('express-async-handler');

const User = require('../models').users;
const router = express.Router();
const usersValidation = require('../routes/validations/users');

router.get('/', validate(usersValidation.select), asyncHandler(async (req, res) => {
    const firstName = req.query.firstName;
    let users;

    if (firstName) {
        users = await User.findAll({ where: { firstName } });
    } else {
        users = await User.findAll({ raw: true });
    }

    res.send({ users });
}));

router.get('/:id', validate(usersValidation.get), asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    res.send({ user });
}));

router.get('/', validate(usersValidation.get), asyncHandler(async (req, res) => {
    const user = await User.findOne({ where: { firstName: req.query.firstName } });

    if (!user) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    res.send({ user });
}));


router.post('/', validate(usersValidation.post), asyncHandler(async (req, res) => {
    const { firstName, age } = req.body.user;

    try {
        const user = await User.create({ firstName, age, professionId: 1 });

        res.send({ user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
}));

router.put('/:id', validate(usersValidation.put), asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    const { firstName, age } = req.body.user;

    try {
        await user.update({ firstName, age });

        res.send({ user });
    } catch (error) {
        res.status(StatusCodes.NO_CONTENT).send({ error });
    }
}));

router.delete('/:id', validate(usersValidation.delete), asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    await user.destroy();

    res.sendStatus(StatusCodes.NO_CONTENT);
}));

module.exports = router;
