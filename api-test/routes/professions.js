const express = require('express');
const profession = require('../models').professions;
const router = express.Router();

router.get('/', async (req, res) => {
    const professions = await profession.findAll({ raw: true });

    res.send({ professions });
});

module.exports = router;
