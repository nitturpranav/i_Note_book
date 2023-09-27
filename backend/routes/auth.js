const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET = "pranavisgood";
// Route 1:Create a User using: POST "/api/auth". Doesn't require verification
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password of minimum 5 length").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors return bad request and the  errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      //using  brcypt for encryption and salt for additional + string password encryption
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
      });
      // .then(user=>res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'please enter a unique value for email',message:err.message})});
      const data = {
        user: {
          id: user.id,
        },
      };
      //authtoken provides a token for verification
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
// Route 2:Authenticate a User using: POST "/api/auth/login". Doesn't require 
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are errors return bad request and the  errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Enter valid  credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res.status(400).json({success:false, error: "Enter valid credentials" });
    
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      //authtoken provides a token for verification
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({success,authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some internal error occured");
    }
  }  
  );
  // Route 3:Get logged in User  detailsusing: POST "/api/auth/getuser". login required
  router.post("/getuser",fetchuser, async (req, res) => 
  {
try{
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user);

}
catch(error)
{
  console.log(error.message);
      res.status(500).send("Some internal error occured");
    }
    })

module.exports = router;
