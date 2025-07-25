const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  type: String,
  status: String
})

module.exports = mongoose.model('Product', productSchema)