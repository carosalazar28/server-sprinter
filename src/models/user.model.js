const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  workspaces: [{
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
  }],
}, {
  timestamps: true,
});

const User = model('User', userSchema)

module.exports = User;