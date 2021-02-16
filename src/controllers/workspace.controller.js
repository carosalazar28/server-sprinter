const Workspace = require('../models/workspace.model');
const User = require('../models/user.model');
const Backlog = require('../models/backlog.model');

module.exports = {
  async create( req, res ) {
    try {
      const user = await User.findById(req.user);

      if( !user ) {
        throw new Error('User does not exist')
      }

      const workspace = await Workspace.create({ ...req.body, owner: user._id })

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

  async showWorkspaces( req, res ) {
    try {
      const user = await User.findById(req.user);
      const { _id } = user
      const workspaces = await Workspace.find({ owner: { $eq: _id }});
      
      if(!workspaces) {
        throw new Error('Todavía no tienes espacios de trabajo creados')
      }
      
      res.status(200).json({message: 'workspace list', data: workspaces })
    }
    catch(err) {
      res.status(404).json({ message: 'Workspace does not found' })
    }
  },

  async update( req, res ) {
    try { 
      const { workspaceId } = req.params

      const { name, description, weeks, sprint, teammates } = req.body
      
      const teammate = teammates

      const workspace = await Workspace.findById(workspaceId)
      
      if( !workspace ) {
        throw new Error('Could not updated that workspace')
      }

      workspace.name = name
      workspace.description = description
      workspace.weeks = weeks
      workspace.sprint = sprint
      workspace.teammates = workspace.teammates.concat(teammate)
      
      await workspace.save({ validateBeforeSave: false })
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
      const backlogId = worskpace.backlog

      const backlog = await backlog.findByIdAndDelete(backlogId)
      
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