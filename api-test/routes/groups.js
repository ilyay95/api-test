const express = require('express');
const Group = require('../models').groups
const router = express.Router();
const Users = require('../models').users;

router.get('/', async (req, res) => {
    const groups = await Group.findAll({ include: [{
        model: Users,
        as: 'users',
        required: false,
        through: {
            attributes: ['id']
        }
    }]});

    res.send({ groups });
});

module.exports = router;
