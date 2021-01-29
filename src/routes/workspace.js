const router = require('express').Router();
const workspaceController = require('../controllers/workspace.controller');
const { auth } = require('../utils/auth');

router.route('/').post(auth, workspaceController.create);
router.route('/:workspaceId').get(workspaceController.show);
router.route('/:workspaceId').put(workspaceController.update);

module.exports = router;