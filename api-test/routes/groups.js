const express = require('express');
const asyncHandler = require('express-async-handler');
const { validate } = require('express-validation');
const { StatusCodes } = require('http-status-codes');
const Group = require('../models').groups
const router = express.Router();
const Users = require('../models').users;
const groupsValidation = require('../routes/validations/groups');
const Connects = require('../models').connections;
const { Op } = require('sequelize');

router.get('/', validate(groupsValidation.query), asyncHandler(async (req, res) => {
    let currentPage = req.query.currentPage;
    const pageSize = req.query.pageSize;
    let search = req.query.search;
    let groups;
    let serchObj = {};

    if (search) {
        serchObj = { name: { [Op.iLike]: `%${search}%` } };
    }

    let offset = (currentPage - 1) * pageSize;

    groups = await Group.findAndCountAll({
        include: [{
            model: Users
        }],
        where: serchObj,
        distinct: true,
        offset: offset,
        limit: pageSize
    });

    res.send({ groups });
}));

router.get('/:id', validate(groupsValidation.get), asyncHandler(async (req, res) => {
    const group = await Group.findByPk(req.params.id, {
        include: [{
            model: Users,
            as: 'users',
            required: false,
            through: {
                attributes: ['id']
            }
        }]
    });

    if (!group) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    res.send({ group });
}));

router.post('/', validate(groupsValidation.post), asyncHandler(async (req, res) => {
    const { name } = req.body;

    try {
        const user = await Group.create({ name });

        res.send({ user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
}));

router.delete('/:id', validate(groupsValidation.delete), asyncHandler(async (req, res) => {
    const user = await Group.findByPk(req.params.id);
    const groupId = req.params.id;

    if (!user) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    await Connects.destroy({ where: { groupId } });
    await user.destroy();

    res.sendStatus(StatusCodes.NO_CONTENT);
}));

module.exports = router;
