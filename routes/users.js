const express = require('express');
const User = require('../models').User
const router = express.Router();
const usersValidation = require('../routes/validations/users');
const { validate } = require('express-validation')

router.get('/', validate(usersValidation.get), async (req, res) => {
    const users = await User.findAll({ raw: true });

    res.send({ users });
});

router.get('/:id', validate(usersValidation.get), async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        res.sendStatus(httpStatus.NOT_FOUND);
    }

    res.send({ user });
});

router.post('/', validate(usersValidation.post), async (req, res) => {
    const { firstName, age } = req.body.user;

    try {
        const user = await User.create({ firstName, age });

        res.send({ user });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
    }
});

router.post('/delete/:id', validate(usersValidation.delete), async (req, res) => {
    const user = await User.getById(req.params.id);

    if (!user) {
        res.sendStatus(httpStatus.NOT_FOUND);
    }

    await User.remove(req.params.id);

    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = router;
