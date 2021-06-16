const express = require('express');
const Profession = require('../models').professions;
const router = express.Router();

router.get('/', async (req, res) => {
    const professions = await Profession.findAll({ raw: true });

    res.send({ professions });
});

module.exports = router;
