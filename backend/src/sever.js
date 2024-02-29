const express = require('express');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT;
const hostname = process.env.HOST;
const configViewEngine = require('./config/viewEngine');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan')
const Router = require("./route/web")
const cors = require('cors')
const cloudinary = require('cloudinary')
const con_string = process.env.CONNECTION_STRING;



mongoose.connect(con_string)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
app.use(express.json({ extended: false }));
app.use(express.json({ extended: false, limit: "90mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(cors());

app.use('/', Router)

configViewEngine(app);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
