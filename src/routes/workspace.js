const router = require('express').Router();
const workspaceController = require('../controllers/workspace.controller');
const { auth } = require('../utils/auth');

router.route('/').post(auth, workspaceController.create);

module.exports = router;