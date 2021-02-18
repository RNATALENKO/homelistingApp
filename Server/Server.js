//import env variables
require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;


//import mongoose
const mongoose = require('mongoose');

//import authorization routes
const authRoute = require('./Routes/AuthRoute');



//import cors support, allows cross orgin request and responses without opaque status and null bodies
const cors = require('cors');

//import body parser
const bodyParser = require('body-parser');

//create express application
const express = require('express');
const app = express();
const port = 8080;

//activate body parser
app.use(express.json()); //need this to parse incoming request into Json format //must be activated before the route

//prevents the blockage of the cors policy: Access to fetch at 'http://localhost:8080/test' from origin 'http://localhost:19006' has been blocked by CORS policy: 
app.use(cors());

/*
//parser for header content type, if setting mode to no cors, and has a different origin
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  */
  

//activate body parser
//app.use(bodyParser.json());

//import router and activate
const router = require('./Routes/Router');
const defaultroute = require('../Server/Routes/DefaultRoute');
const TestRoute = require('../Server/Routes/TestRoute');
app.use(router);
app.use(defaultroute);
app.use(TestRoute);

//set root url for authroute
app.use('/user', authRoute);

console.log(DB_NAME);
console.log(typeof DB_NAME);


//connect to the mongodb,  Rodion_1: password, HomeListings is name of db
const connection = mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.eiw5j.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`).then(result=>{
    //setup port
    app.listen(port, ()=>{
        console.log("port activated");
    }); 
}).catch(err=>console.log(err));

const db = mongoose.connection; 

module.exports = db;