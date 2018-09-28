var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var feedBacks = require("./models/feedback.model");
var businessinform = require("./models/businessinfo.model");
var generate = require("./models/reports.model");
var cors = require("cors");
var app = express();
const nodemailer = require('nodemailer');


var db = mongoose.connect(
  "mongodb://localhost:27017/bizboz",
  function(err, response) {
    if (err) console.log("There is an error in connecting with mongodb.");
    console.log("Connection has been added");
  }
);
app.use(cors());
app.set("port", process.env.port || 5789);
app.use(bodyparser.json());

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'bizbo.contact@gmail.com',
      pass: 'bizbo123$',
  },
});
app.post('/send-email', function(req, res) {
  var companyId =req.body.companyId
  var mailOptions = {
      from: 'bizbo.contact@gmail.com',
      to: "lizasusanjacob@gmail.com",
      subject: "test mail",
      html: '<a href="http://localhost:4200/report-page/'+companyId+'">click</a>',
      
  };

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
      console.log(error);
  }
  console.log(`Message sent: ${info.response}`);
});
});

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/businessinfo", (req, res) => {
    businessinform.find({},function(err,result){
      if (err) {
        console.log(
          "There is an error in getting business information in database"
        );
        res.send({
          message: "Failed to get business info",
          data: 500
        });
      } else {
        res.send({
          message: "Successfully get business info",
          data: result
        });
      }
    });
  });
  app.get("/businessdata", (req, res) => {
    console.log(req.query._Id);
    businessinform.findOne({_id:req.query.companyId},function(err,result){
      console.log("++");
      console.log(result);
      if (err) {
        console.log(
          "There is an error in getting business information in database"
        );
        res.send({
          message: "Failed to get business info",
          data: 500
        });
      } else {
        res.send({
          message: "Successfully get business info",
          data: result
        });
      }
    });
  });
  app.get("/generate-report", (req, res) => {
    
    console.log(req.query.companyId);
    generate.findOne({
      companyId:req.query.companyId
    },function(err,result){
      if (err) {
        console.log(
          "There is an error in getting report generation in database"
        );
        res.send({
          message: "Failed to get report generation",
          data: 500
        });
      } else {
        res.send({
          message: "Successfully get report generation",
          data: result
        });
      }
    });
  });

app.post("/feedback", (req, res) => {
  console.log(req.body);
  var feedback = req.body.feedback;
  var email = req.body.email;

 
  var feedBack = feedBacks(req.body);
  feedBack.save((err, result) => {
    if (err) {
      console.log(err);
      console.log("There is an error in adding feedback in database");
      res.send({
        error: "Failed to add new feedback",
        status: 500
      });
    } else {
      res.send({
        success: "Successfully added new feedback",
        status: 200
      });
    }
  });
});

app.post("/businessinfo", (req, res) => {
  console.log(req.body);
 

  
  var businessInform = businessinform(req.body);
  businessInform.save((err, result) => {
    if (err) {
      console.log(
        "There is an error in adding business information in database"
      );
      res.send({
        success: "Failed to add business info",
        status: 500
      });
    } else {
      res.send({
        success: "Successfully added new business info",
        status: 200
      });
    }
  });
});

app.post("/generate-report", (req, res) => {
  console.log(req.body);
 


  
  var generateReport = generate(req.body);
  generateReport.save((err, result) => {
    if (err) {
      console.log(err);
      console.log("There is an error in adding generated report in database");
      res.send({
        error: "Failed to add new generated report",
        status: 500
      });
    } else {
      res.send({
        success: "Successfully added new generated report",
        status: 200
      });
    }
  });
});

app.listen(app.get("port"), function(err, response) {
  console.log("server is running on port", app.get("port"));
});
