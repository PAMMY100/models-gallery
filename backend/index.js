const port = 4000;
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const multer = require('multer')
const path = require("path");
const cors = require("cors");
const { type } = require('os');
const { Schema } = require('mongoose');
const { error } = require('console');
const { verify } = require('crypto');
//environment variables
require('dotenv').config()

app.use(express.json())
app.use(cors())

//Database connection with MongoDB
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true})


const connection = mongoose.connection;
connection.on('open', () => {
  console.log("Connected Database Successfully");
})

//API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename:(req,file,cb) => {
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage:storage})

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'),(req,res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})

// Schema for creating Products
const productSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Product = mongoose.model('Product', productSchema)
app.post('/addproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if(products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0]
      id = last_product.id + 1
    }
    else {
      id = 1;
    }
    const product = new Product({
      id: id,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price
    })
    console.log(product)
    await product.save()
    console.log("Saved")
    res.json({
      message: "product created successfully",
      status: 200
    })
  } catch (error) {
    console.log("Message: ", error)
  }
})

// Creating API for deleting Products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({id: req.body.id});
  console.log("removed");
  res.json({
    success: true,
    status: 200
  })
})

app.get('/allproducts', async (req,res) => {
  let products = await Product.find({});
  console.log("All product fetched");
  res.send(products)
})

// Schema creating for User model

const usersSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
  cartData: {
    type:Object
  },
  date: {
    type: Date,
    default: Date.now
  }
})
const Users = mongoose.model('Users', usersSchema)

//Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {
  try {
      let check = await Users.findOne({email: req.body.email});

      if (check) {
        return res.status(400).json({success: false, message: "existing user with the email"})
      }
      let cart = {};
      for (let i = 0; i < 100; i++) {
        cart[i] = 0
      };

      const user = new Users ({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
      })

      await user.save()

      const data = {
        user: {
          id: user.id
        }
      }

      const token = jwt.sign(data, 'secret_ecom');
      res.json({success: true, token})
  } catch(error) {
    console.log("message: ", error)
  }
})

// creating endpoint for user login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({email: req.body.email});
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      res.json({success: true, token})
    }
    else {
      res.json({success: false, message: "wrong password!" })
    }
  } else {
    res.json({success: false, message: "wrong email ID"})
  }
})

//creating endpoint to fetch users
app.get('/users', async (req, res) => {
  const users = await Users.find({});
  res.send(users)
})

//creating middleware to fetch user
  const fetchUser = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
      res.status(401).send({errors: "Please authenticate using a valid token"})
    }
    else {
      try {
        const data = jwt.verify(token, 'secret_ecom')
        req.user = data.user
        next()
      } catch(error) {
        res.status(401).send({errors: "Please authenticate using a valid token"})
      }
    }
  }

//creating endpoint for adding products in cartData
app.post('/addtocart',fetchUser, async(req, res) => {
  console.log(req.body,req.user)
  // let userData = await Users.findOne({_id: req.user.id})
  // userData.cartData[req.body.itemId] += 1
  // await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
  // console.log(userData.cartData)
  // res.send('added')
})

//creating endpoint for removing products in cartData
app.post('/removefromcart', fetchUser, async(req, res) => {
  let userData = await Users.findOne({_id: req.user.id})
  userData.cartData[req.body.itemId] += 1
  await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
  console.log(userData.cartData)
  res.send('added')
})


app.listen(port, (error) => {
  if (!error) {
    console.log("running server on Port " + port)
  }
  else {
    console.log("Error: " +error)
  }
})
