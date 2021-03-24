const express = require('express');
const Profession = require('../models').User
const router = express.Router();

router.get('/profesion', async (req, res) => {
    const profession = await Profession.findAll({ raw: true });

    res.send({ profession });
});

