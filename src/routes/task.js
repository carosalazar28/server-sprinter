const router = require('express').Router();
const taskController = require('../controllers/task.controller');
const { auth } = require('../utils/auth');

router.route('/').get(auth, taskController.list);

module.exports = router;