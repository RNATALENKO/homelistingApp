const jwt = require('jsonwebtoken');

require('dotenv').config();
const secretToken = process.env.TOKENSECRET;




//middleware that tests to see if incoming req contains token

const verify =  (req,res,next)=>{

    //check to see if req header contains an authorized token
    const token = req.get("Authorization");

    //if token doesn't exist send an error
    if(!token) return res.status(401).send("Unathorized");
    
    //if it does exist, we need to verify the token
    //it returns the decrypted data payload, but if there is no authorization
    //we use the try catch just in case something goes wrong with authorization
    try{

        //decrypt the data
        const authorization = jwt.verify(token,secretToken);

        //create object in request, attach the decrypted users data
        req.verification = authorization, //when working in api, you can simply view the decrypted credentials with req.verification

        //allows access to next callback i.e. main http method
        next();

    }catch(error){
        res.send(400).send("Invalid Token")
    } 
}


module.exports = verify;


