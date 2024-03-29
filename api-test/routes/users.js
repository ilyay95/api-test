const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { validate } = require('express-validation');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const User = require('../models').users;
const router = express.Router();
const usersValidation = require('../routes/validations/users');
const Groups = require('../models').groups;
const Connects = require('../models').connections;

router.get('/all', asyncHandler(async (req, res) => {
    let users = await User.findAll({ raw: true });

    res.send({ users });
}));

router.get('/', validate(usersValidation.query), asyncHandler(async (req, res) => {
    let currentPage = req.query.currentPage;
    const pageSize = req.query.pageSize;
    let search = req.query.search;
    let users;
    let serchObj = {};

    if (search) {
        serchObj = { firstName: { [Op.iLike]: `%${search}%` } };
    }

    let offset = (currentPage - 1) * pageSize;

    users = await User.findAndCountAll({
        where: serchObj,
        offset: offset,
        limit: pageSize
    });

    res.send({ users });
}));

router.get('/:id', validate(usersValidation.get), asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [{
            model: Groups,
            as: 'groups',
            required: false,
            through: {
                attributes: ['groupId']
            }
        }]
    });

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
    const { firstName, age, professionId, logo } = req.body.user;

    try {
        const user = await User.create({ firstName, age, professionId, logo });

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

    const { firstName, age, professionId, logo } = req.body.user;

    try {
        await user.update({ firstName, age, professionId, logo });

        res.send({ user });
    } catch (error) {
        res.status(StatusCodes.NO_CONTENT).send({ error });
    }
}));

router.delete('/:id', validate(usersValidation.delete), asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const userId = req.params.id;

    if (!user) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    await Connects.destroy({ where: { userId } });
    await user.destroy();

    res.sendStatus(StatusCodes.NO_CONTENT);
}));

module.exports = router;
