const router = require('express').Router();
const bodyParser = require('body-parser');

const bodyparser = bodyParser.json();

router.use('/users', bodyparser, require('./users'));

module.exports = router;