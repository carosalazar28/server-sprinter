const router = require('express').Router();
const taskController = require('../controllers/task.controller');
const { auth } = require('../utils/auth');

router.route('/:workspaceId').post(taskController.create);
router.route('/tasks').get(auth, taskController.showTask);
router.route('/:taskId').put(taskController.update);
router.route('/:taskId').get(taskController.show);

module.exports = router;