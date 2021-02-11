const router = require('express').Router();
const backlogController = require('../controllers/backlog.controller');
const { auth } = require('../utils/auth');

router.route('/:backlogId').get(backlogController.show);

module.exports = router;