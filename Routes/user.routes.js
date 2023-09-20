const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const { usermodel } = require("../Models/user.models");
const { authenticate } = require("../Middlewares/authenticate.js");


userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

   if(email === process.env.id && password === 
    process.env.pass){

    const token = await jwt.sign(
      { email },
      process.env.token_key,
      { expiresIn: "1d" }
    );
    const ref_token = await jwt.sign(
      { email },
      process.env.ref_token_key,
      { expiresIn: "7d" }
    );
    res.status(200).send({ msg: "Login Successfull",token,ref_token });
   }else{
    res.status(201).send({ msg: "Wrong Credentials, Please Enter Correct Details..." });
   }
  } catch (err) {
    res.status(500).send({msg:err.message});
  }
});

module.exports = {
  userRouter,
};
