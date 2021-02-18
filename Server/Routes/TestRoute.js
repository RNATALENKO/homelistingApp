const express = require('express');
const TestRoute = express.Router();
const Test = require('../Models/Test');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('../Server');
const verifytokenware = require('../Routes/VerifyTokenWare');


//note because we have the parser activated we cannot send a string as a response, but it has to be in json format. 

TestRoute.get("/test", (req, res)=>{
    res.send({
        message: "hello world!",
    });
})


//list cors options
const corsOptions={
    origin: "http://localhost:19006"
}


//info on no cors error: https://stackoverflow.com/questions/38296732/fetchs-response-is-empty-even-though-the-request-was-successful/38296817

//enable cors for this route
TestRoute.post("/test", /*cors(corsOptions),*/ (req,res)=>{
    

  
  /* headers but may not be necessary if cors middlware active
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  */

    //get the current id
    const currentId = Test.countDocuments({})

 
    const obj = new Test({
        test:req.body.test
    })

    //save the object
    obj.save().then(results=>{

        //how do I get this back to my front end!!? 
        res.send({
            message:"successfully saved!",
            record: results
        })
    }).catch(err=>console.log(err));

})



//JSON is a string format in javascript notation, JSON.parse(), converts the string to an actual object
//JSON.stringify() takes a javascript object, and converts it to a string in JSON notation. 
TestRoute.get('/test/:userId/books/:bookId', (req,res)=>{

    const params = req.params; 
    const type = typeof params; 
    
    const jsonstring = '{"result":true, "count":42}';

    res.send(typeof jsonstring + " " +  JSON.stringify(params));

})




//use hyphen for multiple params
TestRoute.get('/test-:name-:id-:location', (req,res)=>{

    const params = req.params;

    res.send(params)
})



//a method can have multiple call back functions to handle a request on a single route, as many as you want
//without next() however, the other call backs won't be called
//next passes control over to the next call back function after it executes

TestRoute.get('/test/multicallback', (req,res, next)=>{

    next();

}, (req,res)=>{

    res.send("second call back");
} )




//response methods perform actions with the response, such as send JSON response, redirect, send a file
https://expressjs.com/en/guide/routing.html

TestRoute.get('/test/redirect', (req,res)=>{

    res.redirect("/test/1/books/234234");

});



TestRoute.put('/test/:id', (req,res)=>{

    const id = req.params.id; 
    
    Test.findById(id).then(results=>{
        results.test = req.body.test; 

        results.save();
    })
})




TestRoute.get('/test/find', (req,res)=>{

    //this callback requires the handling of the error
    //returns error and number
    //{} empty object gets number of all documents
    Test.countDocuments({}, (err,count)=>{
       
            //sends number
            console.log(count);

            //convert the number to string 
            res.send({
                message: "succesfully counted",
                count: JSON.stringify(count),
            });
    }) 
})


TestRoute.get('/test/count', (req,res)=>{

    console.log("test");

    res.send("hello world");

});



//this is nesting model.methods together in a .then chain to handle the returned query. 
TestRoute.post('/create', (req,res)=>{

    Test.countDocuments({}, (err,count)=>{
        return count; //get count return the promise with count
    }).then(count=>{ //handle the promise

        //increment count by one
        let id = count+1;

        //create test model instance
        const object = new Test({
            testId:id,
            test:req.body.test
        })

        res.send({
            id: object.testId,
        });

        //return instance in promise
        return object; 

    }).then(object=>{ //handle promise
        object.save(); //save the instance of model
    })
})


//find a document based on other properties/ conditions : https://www.geeksforgeeks.org/mongoose-findone-function/
TestRoute.get('/get-:id', (req,res)=>{

    const idParam = req.params.id; 

    //find all documents with an id greater then idparam
    //$gte is syntax for value >= aka greater than equal to
    Test.find({testId:{$gte:parseInt(idParam)}}).then(results=>{
        res.json(results); //returns all the results
    })

})



//route to protect with token verification
TestRoute.get('/users/profile', verifytokenware, (req,res)=>{

    res.send('this is the user profile with all the data');

})





module.exports = TestRoute;