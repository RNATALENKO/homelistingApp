const jwt = require('jsonwebtoken');

//import token key
require('dotenv').config();
const tokenSecret = process.env.TOKENSECRET;

module.exports = (req, res, next) => {
    //get token from req
    const token = req.header('auth-token');

    //if token not in header (means person is not authorized)
    if(!token){
        //401 is unaothorized
        return res.status(401).send('Access Denied');
    }

    //if it does exist, verify it, pass in the token, and the key, so this just makes sure the token was signed with the key you provided
    try{
        const verifiedToken = jwt.verify(token, tokenSecret);

        //create an object in the req object, set it to the verified token object
        req.userVerified = verifiedToken;
        next(); //allows you to progress to the next function

    }catch(error){
        res.status(400).send("invalid token");
    }
}