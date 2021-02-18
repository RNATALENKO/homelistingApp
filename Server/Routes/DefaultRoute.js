
const express = require('express');
const DefaultRoute = express.Router();



DefaultRoute.get('/', (req,res)=>{
    res.send("Welcome, hello World!");
})


module.exports = DefaultRoute; 