const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      message: { type: String, required: true },
      phone: { type: String, required: true },
      status: { type: String },
      finaldate: {type: String,default: Date.now},
      finaltime: { type: String }
      // ,
      // createdAt: { type: Date, default: Date.now }
    },
    {
      versionKey: false
    }
  );

const contactUs = mongoose.model("contactUs",contactSchema);

module.exports = {contactUs}