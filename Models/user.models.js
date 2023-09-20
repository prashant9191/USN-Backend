const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,required:true},
    createdAt:{type: Date,default: Date.now}
},{
    versionKey:false
})

const usermodel = mongoose.model("contact",userSchema);

module.exports = {usermodel}