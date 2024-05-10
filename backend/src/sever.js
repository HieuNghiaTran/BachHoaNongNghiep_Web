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

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

mongoose.connect(con_string)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.use(express.json({ extended: false, limit: "90mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '90mb' }));

app.use(morgan('common'));

app.use(cors());

app.use('/', Router)
configViewEngine(app);





cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



io.on('connection', (socket) => {
  console.log('Client connected'+ " "+ socket.id);

  socket.on('comment', (comment) => {


      io.emit('newComment', comment);
    }
  );

socket.on("sendDataClient", function(data) {

  io.emit("sendDataServer", { data });
})  



});