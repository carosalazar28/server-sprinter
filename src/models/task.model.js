const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  name: 'String',
  description: 'String',
  sprint: 'String',
  asign: {
    type: 'String',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  backlog: {
    type: Schema.Types.ObjectId,
    ref: 'Backlog',
  },
});

const Task = model('Task', taskSchema);

module.exports = Task;