const express = require('express');
const asyncHandler = require('express-async-handler');
const { validate } = require('express-validation');
const { StatusCodes } = require('http-status-codes');
const Group = require('../models').groups
const router = express.Router();
const Users = require('../models').users;
const groupsValidation = require('../routes/validations/groups');
const Connects = require('../models').connections;

router.get('/', validate(groupsValidation.select), async (req, res) => {
    const name = req.query.name;
    let groups;

    if (name) {
        groups = await Group.findAll({ where: { name },
            include: [{
            model: Users,
            as: 'users',
            required: false,
            through: {
                attributes: ['id']
            }
        }] })
    } else {
         groups = await Group.findAll({
            include: [{
                model: Users,
                as: 'users',
                required: false,
                through: {
                    attributes: ['id']
                }
            }]
        });
    }
    res.send({ groups });
});

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
    await Connects.destroy({where: { groupId }});
    await user.destroy();
    res.sendStatus(StatusCodes.NO_CONTENT);
}));

module.exports = router;
