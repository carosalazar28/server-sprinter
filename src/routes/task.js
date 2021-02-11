const router = require('express').Router();
const taskController = require('../controllers/task.controller');
const { auth } = require('../utils/auth');

router.route('/:workspaceId').post(taskController.create);
router.route('/:taskId').put(taskController.update);

module.exports = router;