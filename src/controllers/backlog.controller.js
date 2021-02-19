const { create } = require('../models/backlog.model');
const Backlog = require('../models/backlog.model');

module.exports = {

  async show(req, res) {
    try{
      const { backlogId } = req.params;

      const backlog = await Backlog.findById(backlogId)
        .populate({ 
          path: 'tasks', 
          select: 'name' })

      res.status(201).json(backlog)
    } catch(error) {
      res.status(400).json({ message: error.message })
    }
  },

}