const { Schema, model } = require('mongoose');

const backlogSchema = new Schema({
  workspace: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
});

const Backlog = model('Backlog', backlogSchema);

module.exports = Backlog;