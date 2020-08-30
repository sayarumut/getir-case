const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => console.log(`Connected to ${process.env.DB_NAME} DB...`));
  mongoose.connection.on('error', err => console.log(err.message));
  mongoose.connection.on('disconnected', () => console.log(`Disconnected from ${process.env.DB_NAME} DB...`));
};