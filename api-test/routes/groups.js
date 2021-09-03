const express = require('express');
const Group = require('../models').groups
const router = express.Router();
const Users = require('../models').users;
const { validate } = require('express-validation');
const groupsValidation = require('../routes/validations/groups');
const asyncHandler = require('express-async-handler');

router.get('/', async (req, res) => {
    const groups = await Group.findAll({
        include: [{
            model: Users,
            as: 'users',
            required: false,
            through: {
                attributes: ['id']
            }
        }]
    });

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

module.exports = router;
