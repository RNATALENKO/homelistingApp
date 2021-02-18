//create a router
const express = require('express');
const Home = require('../Models/Home.js');
const router = express.Router(); 
const verify = require('../Middleware/VerifyToken');



//import the express validation




//find all homes
router.get('/api/homes', verify, (req,res)=>{

    Home.find().then(result=>{
        res.send(result);
    }).catch(err=>console.log(err));
})



//post a home
router.post('/api/homes', verify, (req,res)=>{

    //require all fields to be present
    const object = new Home({
        title: req.body.title,
        image:req.body.image,
        price:req.body.price,
        description:req.body.description,
        year:req.body.year,
        address:req.body.address
    })

    //save the object, return the saved object
    object.save().then(result=>{
        res.send(object);
    }).catch(err=>console.log(err));
})



//get the user's profile
//this will get the data from the users token
router.get('/user/profile', verify, (req,res)=>{

    //the token that we get from verification will be decrypted and we can send the user's info back
    res.send({
        success:true,
        userProfile:req.verification,
    })
    res.send(req.verification);

})





module.exports = router; 