const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      status: { type: String ,default:"acnt"},
      finaldate: {type: String,default: Date.now},
      finaltime: { type: String }

    },
    {
      versionKey: false
    }
  );

const pdfData = mongoose.model("pdfData",pdfSchema);

module.exports = {pdfData}