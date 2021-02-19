const { Schema, model } = require('mongoose');

const backlogSchema = new Schema({
  workspace: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  tasks: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }]
  },
}, {
  timestamps: true,
});

const Backlog = model('Backlog', backlogSchema);

module.exports = Backlog;