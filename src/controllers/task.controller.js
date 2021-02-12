const Task = require('../models/task.model');
const Workspace = require('../models/workspace.model');
const Backlog = require('../models/backlog.model');
const User = require('../models/user.model');
const { show } = require('./user.controller');

module.exports = {

  async create(req, res) {
    try {
      const { workspaceId } = req.params
      const workspace = await Workspace.findById(workspaceId).populate('backlog')

      if(!workspace) {
        throw new Error('Invalid workspace')
      }

      let backlog = workspace.backlog
      let user = workspace.owner
      let task;
      if( !backlog ) {
        backlog = await Backlog.create({
          workspace: workspace,
        }) 
        
        task = await Task.create({ ...req.body, backlog: backlog._id })
        
        backlog.tasks.push(task);
        await backlog.save({ validateBeforeSave: false })

        task.author = user
        await task.save({ validateBeforeSave: false })
        
        workspace.backlog = backlog._id;
        await workspace.save({ validateBeforeSave: false })
      }
      else {
        task = await Task.create({ ...req.body, backlog: backlog._id })
        backlog.tasks.push(task);
        await backlog.save({ validateBeforeSave: false })

        task.author = user
        await task.save({ validateBeforeSave: false })
      }
      res.status(201).json(task)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  },

  async update( req, res ) {
    try {
      const { taskId } = req.params
      const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true })

      if( !task ) {
        throw new Error('Could not updated that task')
      }
      
      res.status(200).json({ message: 'Task updated', data: task })
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  },

  async showTask( req, res ) {
    try {
      const user = await User.findById(req.user)
      const { _id } = user
      const tasks = await Task.find({ author: { $eq: _id }});

      if(!tasks) {
        throw new Error('Todavía no tienes espacios de trabajo creados')
      }

      res.status(200).json({ message: 'Task list', data: tasks })
    } catch(err) {
      res.status(404).json({ message: 'Task does not found' })
    }
  },

  async show( req, res ) {
    try {
      const { taskId } = req.params
      const task = await Task.findById( taskId ).populate({ path: 'backlog' })

      if( !task ) {
        throw new Error('Task not found')
      }
      res.status(200).json({ message: 'Task found', data: taks })
    } catch(error) {
      res.status(404).json({ message: 'Task not found' })
    }
  },
}