const Task = require('../models/task.model');

module.exports = {

  async create(req, res) {
    try {
      const { workspaceId } = req.params
      const workspace = await Workspace.findById(workspaceId).populate('backlog')
      
      if(!worskpace) {
        throw new Error('Invalid workspace')
      }

      let backlog = workspace.backlog
      let task;
      if(!backlog) {
        backlog = await Backlog.create({
          worskpace: worskpace,
        })
      
        task = await Task.create({ ...req.body, backlog: backlog._id })
        
        backlog.tasks.push(task);
        await backlog.save({ validateBeforeSave: false })
        
        worskpace.backlog = backlog._id;
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