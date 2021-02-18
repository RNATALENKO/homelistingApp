const express = require('express');
const authRoute = express.Router(); 
const User = require('../Models/User');
const {body, validationResult} = require('express-validator'); //the express validator analyzes the request, before you send ther esponse
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//access enviro file
require('dotenv').config();
const tokenSecret = process.env.TOKENSECRET;

//note: exists validates if the field exists in the request, not the db
const registervalidation = [
    body('email').exists().isEmail(), //will send error if is not email, and if exists
    body('firstname').exists().notEmpty().isLength({min:3}).isString(),
    body('lastname').exists().notEmpty().isLength({min:3}).isString(),
    body('password').notEmpty().isLength({min:8})
]

const loginvalidation = [
    body('username').notEmpty(),
    body('password').notEmpty(),
]


authRoute.post('/register', registervalidation, async (req,res)=>{

    //checks request for the validations
    errors = validationResult(req);

    //if errors has something,
    if(!errors.isEmpty()){
        //return to prevent the save data
        return res.status(200).json(errors);
    }


    //check if email exists
    const userExists = await User.findOne({email:req.body.email});
    if(userExists){
        return res.status(400).send({
            message:"email exists"
        })
    }





    //password hashing, generate a hash code for password from the req body
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);


    //create a user object and save to database
    //pass the hash code into the databse
    const userObj = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email:req.body.email,
        password: hash,
    });

    

    userObj.save().then(result=>{
        res.send({
            id: userObj._id,
            firstname: userObj.firstname,
            lastname:userObj.lastname,
            email: userObj.email,
        });
    }).catch(err=>res.status(400).json(err));

})


authRoute.post('/login', loginvalidation, async (req,res)=>{


    //validate fields with express validator 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }


    
    //check if user exists
    const userExists = await User.findOne({email: req.body.username});
    if(userExists == null){
        return res.status(400).send("No email exists");
    }
 

    //check if password is correct 
    //use bcrypt to compare user input password from req, and the has
    //compare() returns a boolean true or false, if they match up.
    const validPassword = await bcrypt.compare(req.body.password, userExists.password);
    if(!validPassword){
        return res.status(400).send("wrong password");
    }
    
    //if everything is valid, create and assign a token, send it back to client
    //payload is the data you would like to sign the token with, i.e. user id
    //setting up a key called userId, and firstname, and getting the id from the db collection called _id
    //then pass in a value to set as the sercret, 
    //these secrets should not be hardcoded but saved on .dotenv file or a layer removed so you don't expose it to the user
    //the token is just hash encoded data with a secret, notice the output is like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTMxNjQ2MTV9.xSwY-_C0M-StkFgBtabYk6FaZMpLfTsPlJw3_Bs_o4I
    const token = jwt.sign({userId: userExists._id,firstname: userExists.firstname,}, tokenSecret);

    res.header('auth-token', token).send({
        message: "login success", token,
    });


})



module.exports = authRoute; 