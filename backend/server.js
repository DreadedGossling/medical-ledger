const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Product = require('./schemas/product.js')
const User = require('./schemas/user.js')
const connectDB = require('./db.js')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
connectDB()

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running successfully on Port ==> ${PORT}`);
});

// --------------- For Product ----------------

// API Endpoint to Get All Products
app.get("/api/products", async (req, res) => {
  const products = await Product.find()
  console.log("List of Products ==>", products)
  return res.json({ products: products })
});


//API Endpoint to Get Single Data
app.get('/api/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Product.findById(id);
    if (!item) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send(item);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching Product ==> ', error });
  }
});

// API Endpoint to Handle Post Data
app.post('/api/add-product', async (req, res) => {
  try {
    const data = req.body.product;
    var product = new Product({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      type: data.type,
      status: data.status,
      createdAt: data.createdAt || new Date()
    })
    console.log(`Adding Product Intitalize with Product ==> ${product}`)
    const savedProduct = await product.save();
    res.status(201).send({ message: 'Product saved successfully', item: savedProduct });
  } catch (error) {
    res.status(500).send({ message: 'Error creating Product ==> ', error });
  }
});

//API endpoint to update data
app.put("/api/edit-product/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updatedAt: new Date()
  });
  res.json({ message: "Product updated successfully" });
});

// Delete an Product by ID
app.delete('/api/delete-product/:id', async (req, res) => {
  console.log(`Deleting Product with Id ==>  ${req.params.id}`)
  try {
    const data = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json(data);
    console.log("Product Deleted successfully ==> ", data)
  } catch (error) {
    console.log("Error deleting Product ==> ", error)
  }
});


// ------------ For User -------------------

// API Endpoint to Get All Users
app.get("/api/users", async (req, res) => {
  const users = await User.find()
  console.log("List of Users ==>", users)
  return res.json({ users: users })
});

// API Endpoint to Handle Post User Data
app.post('/api/add-user', async (req, res) => {
  try {
    const data = req.body.user;
    var user = new User({
      name: data.name,
      description: data.description,
      email: data.email,
      password: data.password,
      role: data.role,
      status: "Active",
      createdAt: new Date(),
    })
    console.log(`Adding User Intitalize with user ==> ${user}`)
    const savedUser = await user.save();
    res.status(201).send({ message: 'User created successfully ==> ', item: savedUser });
  } catch (error) {
    res.status(500).send({ message: 'Error creating User ==> ', error });
  }
});

// Api endpoint to update(PATCH) user status
app.patch('/api/user/update-status/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: status, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User status updated successfully ==> ', user: updatedUser });
  } catch (error) {
    res.status(500).send({ message: 'Error updating user status ==> ', error });
  }
});

// Delete an User by ID
app.delete('/api/delete-user/:id', async (req, res) => {
  console.log(`Deleting User with Id ==>  ${req.params.id}`)
  try {
    const data = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(data);
    console.log("User Deleted successfully ==> ", data)
  } catch (error) {
    console.log("Error deleting User ==> ", error)
  }
});
