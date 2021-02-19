const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  async signup( req, res ) {
    try {
      const { username, email, password } = req.body;
      const encPassword = await bcrypt.hash( password, 8)
      const user = await User.create({ username, email, password: encPassword })

      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
      );
      res.status(201).json({ token })
    }
    catch(err) {
      res.status(400).json({ message: err.message })
    }
  },

  async signin( req, res ) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username })
      if( !user ) {
        throw new Error(' Usuario o contraseña invalida' )
      }
      const isValid = await bcrypt.compare( password, user.password )
      if(!isValid) {
        throw new Error( 'Usuario o contraseña invalida' )
      }
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
      );
      res.status(201).json({ token })
    }
    catch(err) {
      res.status(400).json({ message: err.message })
    }
  },

  async list( req, res ) {
    try {
      const users = await User.find()
      if( !users ) {
        throw new Error('Users list not found')
      }
      res.status(200).json({ message: 'Users list found', data: users })
    }
    catch(err) {
      res.status(200).json({ message: err.message })
    }
  },

  async show( req, res ) {
    try {
      const user = await User
        .findById( req.user )
        .populate({ path: 'workspaces', select: 'name description owner teammates'})
      if( !user ) {
        throw new Error('User not found')
      }
        res.status(200).json({ message: 'User found', data: user })
    }
    catch(error) {
      res.status(404).json({ message: 'User not found' })
    }
  },

  async update( req, res ) {
    try{
      const user = await User
        .findByIdAndUpdate( req.user, req.body, { new: true })

      if( !user ) {
        throw new Error('Could not update that user')
      }
      res.status(200).json({ message: 'User updated', data: user})

    } 
    catch(error) {
      res.status(400).json({ message: 'User could not be updated'})
    }
  },

  async destroy( req, res ){
    try {
      const  user = await User.findByIdAndDelete(req.user)
      if( !client ) {
        throw new Error('Could not delete that user')
      }
      res.status(200).json({ message: 'User deleted', data: user, })
    } 
    catch(err) {
      res.status(400).json({ message: 'User could not be deleted' })
    }
  },
}