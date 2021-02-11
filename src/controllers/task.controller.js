const Task = require('../models/task.model');
const Workspace = require('../models/workspace.model');
const Backlog = require('../models/backlog.model');

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
}