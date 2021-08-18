const router = require('express').Router();
const bodyParser = require('body-parser');

const bodyparser = bodyParser.json();

router.use('/users', bodyparser, require('./users'));
router.use('/professions', bodyparser, require('./professions'));
router.use('/groups', bodyparser, require('./groups'));

module.exports = router;
