const mongoose = require('mongoose');

function connect() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/alamesa';
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(mongoURI, options);
  
  mongoose.connection.once('open', () =>
    console.log('connection established sucessfully')
  );
  mongoose.connection.on('error', (err) =>
    console.log('something went wrong', err)
  );
  return mongoose.connection;
}

module.exports = { connect }