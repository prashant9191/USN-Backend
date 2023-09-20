const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config()
const cors = require("cors");
const {userRouter}= require("./Routes/user.routes");
const {contactUsRouter}= require("./Routes/contactUs.routes.js")
const {blogRouter}= require("./Routes/blog.routes")
const {connection} = require("./Configs/db");
const {authenticate}= require("./Middlewares/authenticate");
const {businessRouter}= require("./Routes/business.routes")
const app= express()
app.use(cors());
app.use(express.json());

app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.use("/contact",contactUsRouter)
app.use("/business",businessRouter)
// app.use(authenticate);

// app.use("/blogs",contactRouter)



app.listen(process.env.PORT,async ()=>{
    try{
        await connection;
        console.log("Connected to DB")
    }catch(error){
        console.log(error.message)
    }
    console.log("running on PORT "+process.env.PORT)
});