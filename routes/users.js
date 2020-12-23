const express = require('express');
const User = require('../models').User
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.findAll({ raw: true });

    res.send({ user });
});

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        res.sendStatus(httpStatus.NOT_FOUND);
    }

    res.send({ user });
});

router.post('/', async (req, res) => {
    const { firstName, age } = req.body.user;

    try {
        const user = await User.create({ firstName, age });
        res.send({ user });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
    }
});

router.post('/delete/:id', async (req, res) => {
    const user = await User.getById(req.params.id);

    if (!user) {
        res.sendStatus(httpStatus.NOT_FOUND);
    }

    await User.remove(req.params.id);

    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = router;
