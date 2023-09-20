const express = require("express");
const { contactUs } = require("../Models/contactMe");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const contactUsRouter = express.Router();

contactUsRouter.get("/", async (req, res) => {
  try {
    const userdata = await contactUs.find();
    res.send(userdata);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

contactUsRouter.post("/addcontact", async (req, res) => {
  let { name, email, message, phone, status} = req.body;
  try {
    function get_date() {
      let date = new Date();
      var year = date.getFullYear();
      var mes = date.getMonth() + 1;
      var dia = date.getDate();
      var today = dia + "-" + mes + "-" + year;
      return today;
    }
    function get_time(){
      let date = new Date();
      let utc = date.getTime() + (date.getTimezoneOffset() * 60000); // Convert to UTC time
      let istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
      let istTime = new Date(utc + istOffset);
      let hours = istTime.getHours();
      let mins = istTime.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
      var time = hours + ":" + mins + " " + ampm;
      return time;
  }

    const finaldate = get_date();
    const finaltime = get_time();
    const contact = new contactUs({
      name,
      email,
      message,
      phone,
      status,
      finaldate,
      finaltime
    });
    await contact.save();
    res.send({ msg: "Contact has been added" });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

contactUsRouter.patch("/editcontact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    await contactUs.findByIdAndUpdate(id, payload);
    res.send({ msg: "Status updated" });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

contactUsRouter.get("/filter", async (req, res) => {
  const{Sdate,Edate}=req.body;
    
  try {
      let sdate= new Date(Sdate).toISOString();
  let edate= new Date(Edate).toISOString();
  console.log(sdate, edate);
  let data= await contactUs.find({finaldate:{$gte:sdate,$lte:edate}});
  res.send(data)
  } catch (err) {
      res.send({msg:err.message})
  } 
});


contactUsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const contactID = req.params.id;
    await contactUs.findByIdAndDelete({ _id: contactID });
    res.send({ msg: "Data deleted" });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

module.exports = {
  contactUsRouter,
};
