const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoute = express.Router(); 
const userModel = require('../Models/User');
const {body, validationResult} = require('express-validator');

require('dotenv').config();
const secretToken = process.env.TOKENSECRET;



//validation
const registervalidation = [
    body('firstname').isString().isLength({min:3}).exists().notEmpty(),
    body('lastname').isString().isLength({min:3}).exists().notEmpty(),
    body('email').exists().notEmpty().isEmail(),
    body('password').exists().isLength({min:8}).notEmpty(),
]

const loginvalidation = [
    body('username').exists().notEmpty().isEmail(),
    body('password').exists().isLength({min:8}).notEmpty(),
]

//generate token helper function
//this user object is taken from the await find() methods return
const generateToken = (userObj)=>{
    return jwt.sign({userId:userObj._id, username: userObj.email, firstname: userObj.firstname }, secretToken);
}



//registration form 
//also asigns a token
authRoute.post('/register',registervalidation, async (req,res)=>{


    //validate the req data using express validator, return errors if errors exist
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.send(400).json(errors);


    //check if user exists
    const user = await userModel.findOne({email:req.body.email});
    if(user) return res.status(400).json({success:false, message:"User exists"}); //success boolean will be used in front end


    //save NEW user to database
    //hash password
    const rounds = 10; 
    const userPlainTextPassword = req.body.password;

    const salt = await bcrypt.genSalt(rounds); //generate salt
    const hash = await bcrypt.hash(userPlainTextPassword,salt); //generate hash

    const newUser = userModel({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:hash, //store hash in model to save to db
    })


    try{
        const savedUser = await newUser.save();

        //create and sign token, add it to the header
        const token = generateToken(newUser);

        if(savedUser){
            res.append('Authorization', token); //attach token to registered user response
            res.send({
                success:true, //used in front end
                message:"register successful",
                savedUser:{ //don't return password, and return id instead
                    userId: savedUser._id,
                    firstname: savedUser.firstname,
                    lastname: savedUser.lastname,
                    email:savedUser.email,
                },
                token
            }); 
        }
    }
    catch(error){
        res.status(400).send({
            success:false, error
        })
    }
      
})



//login form
authRoute.post('/login', loginvalidation, async (req,res)=>{

    //validate request data first 
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({
            errors, succes:false
    });

    //if user exists, authenticate password, create and send token, otherwise send status error 
    const foundUser = await userModel.findOne({email:req.body.username});

    //if no user return error
    if(!foundUser) return res.status(400).send({success:false, message:"Email Incorrect"});


    //authenticate that password belongs to user
    const passwordMatch = await bcrypt.compare(req.body.password, foundUser.password); //returns true or false if match
    if(!passwordMatch) return res.status(400).send({success:false, message: "password incorrect"});


    //if they pass all the validation we send the token, sign with data and secret key
    //token returns as a hash code string
    const token = generateToken(foundUser);

    //attach the token hash to the header of the response
    res.append('Authorization', token);
    res.send({
        success:true,
        message:"Log in successful",
        foundUser: {
            userId: foundUser._id, 
            email: foundUser.email,
        },
        token,
    });
})


module.exports = authRoute; 


