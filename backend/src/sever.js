const express = require('express');
const path = require('path')
require('dotenv').config(); 
const port = process.env.PORT
const hostname= process.env.HOST
const configViewEngine= require('./config/viewEngine')
const app = express();
var bodyParser = require("body-parser");
//const  router = require('./route/web');
const mongoose = require("mongoose");
const con_string = process.env.CONNECTION_STRING;


mongoose.connect(con_string).then(() => {
  console.log('Connected to database ')
})
 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


configViewEngine(app)

//app.use('/',router)

app.listen(port,hostname, () => {
    console.log(`Example app listening on port ${port}`)
  })
