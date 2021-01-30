const { Schema, model } = require('mongoose');

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  weeks: {
    type: Number,
  },
  sprint: {
    type: Number,
  },
  teammates: [String],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

const Workspace = model('Workspace', workspaceSchema);

module.exports = Workspace;