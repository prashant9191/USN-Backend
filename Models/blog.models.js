const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title:{type:String, required:true},
    date:{type:String,require:true},
    content:{type:String,required:true},
    createdAt:{type: Date,default: Date.now}
},{
    versionKey:false
})

const blogmodel = mongoose.model("blog",blogSchema);

module.exports = {blogmodel}