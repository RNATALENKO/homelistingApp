const mongoose = require('mongoose');


//when creating a schema we define a type
const Home = mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    year: String, 
    address:String
})

//convert schema to model and export
//the third arg determins what collection to send the model to
module.exports = mongoose.model("Home", Home, 'HomeListings');


