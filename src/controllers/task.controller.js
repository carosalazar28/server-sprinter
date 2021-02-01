const Task = require('../models/task.model');

module.exports = {
  async list( req, res ) {
    try {
      const user = await User.findById(req.user)
      const taskId = user.task

      const task = await Task.findById(taskId)

      if(!task) {
        throw new Error('Task register not exist')
      }
      res.status(200).json(task)
    }
    catch(err) {
      res.status(400).json({ message: 'Task register not found'})
    }
  },
}