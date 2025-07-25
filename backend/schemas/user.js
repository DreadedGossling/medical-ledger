const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  description: String,
  password: String,
  role: String,
  status: String
})

module.exports = mongoose.model('User', userSchema)