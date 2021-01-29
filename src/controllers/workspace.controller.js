const Workspace = require('../models/workspace.model');
const User = require('../models/user.model');

module.exports = {
  async create( req, res ) {
    try {
      const user = await User.findById(req.user);
      if( !user ) {
        throw new Error('User does not exist')
      }

      const workspace = await Workspace.create({ ...req.body, owner: user })
      
      user.workspaces.push(workspace._id)
      await user.save({ validateBeforeSave: false })

      res.status(201).json({message: 'workspace created', data: workspace })
    }
    catch(err) {
      res.status(400).json({ message: err.message })
    }
  }
}