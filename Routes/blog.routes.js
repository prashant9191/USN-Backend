const express = require("express");
require("dotenv").config();
const blogRouter = express.Router();
const {blogmodel} = require("../Models/blog.models");
const app = express();
app.use(express.json());


blogRouter.get("/",async(req,res)=>{
     try {
        const userdata= await blogmodel.find();
        res.send(userdata)
     } catch (err) {
        res.send({msg:err.message})
     }
});

blogRouter.post("/addblog",async (req,res)=>{
    let {title,date,content,createdAt}=req.body;

    try{
         const blog=  new blogmodel({
            title,
            date,
            content,
            createdAt
         });
         await blog.save();
         res.status(200).send({msg:"Blog Has Been Added"});
    }
    catch(err){
         res.status(201).send({msg:err.message})
    }


})


blogRouter.patch("/editblog/:id",async (req,res)=>{
    try {
        const id=req.params.id;
        const payload=req.body;
        await blogmodel.findByIdAndUpdate(id,payload)
        res.send({"msg":`blog with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})


blogRouter.delete('/delete/:id',async(req,res)=>{
    try{
    const blogID=req.params.id;
    await blogmodel.findByIdAndDelete({_id:blogID})
    res.send({"msg":`note with id:${blogID} has been deleted`})
    }
    catch(err){
        res.send({msg:err.message})
    }
});


module.exports = {
    blogRouter
}