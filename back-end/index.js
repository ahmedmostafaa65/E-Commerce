const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect(process.env.MONGO_URL);

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Static Folder for Images
app.use("/images", express.static("upload/images"));

// Upload Image Endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Mongoose product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

// Add Product Endpoint
app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    old_price: req.body.old_price,
    new_price: req.body.new_price,
  });

  await product.save();
  console.log("Product saved:", product);

  res.json({ success: 1, name: req.body.name });
});

// Get All Products Endpoint
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  console.log("All products fetched");

  res.json(products);
});

// creating endpoint for newcollections
app.get('/newcollections', async(req, res)=>{
  const allproduct = await Product.find({})
  const newCollections = allproduct.slice(1).slice(-8)
  res.send(newCollections)
})
// creating endpoint for popular women
app.get('/popular', async(req, res)=>{
  const PopularProducts = await Product.find({category: 'women'})
  const popular = PopularProducts.slice(0, 4)
  res.send(popular)
})
// creating middleware to fetch user
const fetchUser = async (req, res, next)=>{
  const token = req.header('auth-token')
  if(!token){
    res.status(401).send({errors: 'please authenticate using a valid token'})
  }else{
    try{
      const data = jwt.verify(token,'secret_ecom')
      req.user = data.user
      next()
    }catch(error){
      res.status(401).send({errors: 'please authenticate using a valid token'})
    }
  }
}
// creating endpoint for adding products to cart
app.post('/addtocart',fetchUser, async(req, res)=>{
  let userData = await User.findOne({_id: req.user.id})
  userData.cartData[req.body.itemId] +=1
  await User.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData})
  res.send("Added")
})

// creating endpoint for remove products to cart
app.post('/removefromcart',fetchUser, async(req, res)=>{
  let userData = await User.findOne({_id: req.user.id})
  if(userData.cartData[req.body.itemId] > 0){
    userData.cartData[req.body.itemId] -= 1
    await User.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData})
    res.send("Added")
  }
})
// creating endpoint to get cart data
app.post('/getcart', fetchUser, async(req, res)=>{
  let userData = await User.findOne({_id: req.user.id})
  res.json(userData.cartData)
})

// Remove Product Endpoint
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product removed:", req.body.id);

  res.json({ success: true });
});
// Mongoose user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// creating endpoint for registering the user
app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// creating endpoint for login the user
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "wrong password" });
    }
  }else{
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
