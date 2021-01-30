const Workspace = require('../models/workspace.model');
const User = require('../models/user.model');
const { ReadStream } = require('fs');

module.exports = {
  async create( req, res ) {
    try {
      const user = await User.findById(req.user);
      console.log(user)
      if( !user ) {
        throw new Error('User does not exist')
      }

      const workspace = await Workspace.create({ ...req.body, owner: user })
      console.log(workspace)
      user.workspaces.push(workspace._id)
      await user.save({ validateBeforeSave: false })

      res.status(201).json({message: 'workspace created', data: workspace })
    }
    catch(err) {
      res.status(400).json({ message: err.message })
    }
  },

  async show( req, res ) {
    try{
      const { workspaceId } = req.params
      const workspace = await Workspace
        .findById(workspaceId)
        .populate({ path: 'owner', select: 'name' })
      
      if( !workspace ) {
        throw new Error('Workspace does not exist')
      }

      res.status(200).json(workspace)
    }
    catch(err) {
      res.status(400).json({ message: 'Workspace not found'})
    }
  },

  async update( req, res ) {
    try { 
      const { workspaceId } = req.params

      const { teammates, ...rest } = req.body

      const teammate = teammates

      const update = { ...rest, teammates: teammates ? teammates.concat(teammate): null}
      console.log(update)
      const workspace = await Workspace.findByIdAndUpdate(workspaceId, update, { new: true, useFindAndModify: false })
      if( !workspace ) {
        throw new Error('Could not updated that workspace')
      }

      res.status(200).json({ message: 'Workspace updated', data: workspace })
    }
    catch(err) {
      res.status(400).json({ message: err.message })
    }
  },

  async destroy( req, res ) {
    try { 
      const { workspaceId } = req.params

      const workspace = await Workspace.findByIdAndDelete(workspaceId)
      if( !workspace ) {
        throw new Error('Could not updated that workspace')
      }

      res.status(200).json({ message: 'Workspace deleted', data: workspace })
    }
    catch(err) {
      res.status(400).json({ message: err.message })
    }
  },
}