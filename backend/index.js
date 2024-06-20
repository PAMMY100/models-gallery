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
const bcrypt = require('bcrypt')

//environment variables
require('dotenv').config()

app.use(express.json())

app.use(cors({
  origin: ["https://models-gallery.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}))


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
  try {
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`
    })

  } catch(error) {
    console.log(error.message)
    res.status(500).send("server error")
  }
})



//creating user schema model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: { type: Array, default: [] }
});

const User = mongoose.model('User', UserSchema)

//Route to sign up a new user
app.post('/signup', async(req, res) => {
  const {email, password, username, cart} = req.body

  try {
    let user = await User.findOne({email})

    if (user) {
      return res.status(400).json({error: 'User already exists'});
    }

    //Create new User
    user = new User({
      username,
      email,
      password,
      cart,
    })

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save()

    // Create and assign a token
    const data = {
      user: {
        id: user.id,
      },
    }

    const token = jwt.sign(data, 'secret_ecom')

    res.status(201).json({ success:true, token })
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error')
  }
})




// creating endpoint for user login
app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({error: 'Invalid Credentials'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials'});
    }

    // create and assign a token
    const data = {
      user : {
        id: user.id,
      },
    }

    const token = jwt.sign(data, 'secret_ecom');

    res.status(200).json({success: true, token})
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error')
  }
})

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('token');
  if (!token) {
      return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
  } catch (error) {
      console.error(error);
      res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


//creating endpoint for adding products in cartData
app.post('/addtocart',fetchUser, async(req, res) => {
  try{
    let user = await User.findById({_id: req.user.id})
    user.cart = req.body.Items

    if (!user) {
      return res.status(404).send('User not found');
  }

    await user.save();
    res.status(200).json(user.cart)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

//creating endpoint for removing products in cartData
app.post('/removefromcart', fetchUser, async(req, res) => {
  try{
    let user = await User.findById({_id: req.user.id})
    user.cart = req.body.Items

    if (!user) {
      return res.status(404).send('User not found');
  }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error')
  }
})


//creating endpoint to fetch existingItem in cart
app.get('/cart',fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(404).send({ errors: "User not found" });
    }
    console.log(user.cart)
    res.json(user.cart)
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
})

app.listen(port, (error) => {
  if (!error) {
    console.log("running server on Port " + port)
  }
  else {
    console.log("Error: " +error)
  }
})
