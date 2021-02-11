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
      let task;
      if(!backlog) {
        backlog = await Backlog.create({
          workspace: workspace,
        }) 
      
        task = await Task.create({ ...req.body, backlog: backlog._id })
        
        backlog.tasks.push(task);
        await backlog.save({ validateBeforeSave: false })
        
        workspace.backlog = backlog._id;
        await workspace.save({ validateBeforeSave: false })
      }
      else {
        task = await Task.create({ ...req.body, backlog: backlog._id })
        backlog.tasks.push(task);
        await backlog.save({ validateBeforeSave: false })
      }
      res.status(201).json(task)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  },
}