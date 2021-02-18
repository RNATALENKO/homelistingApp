const mongoose = require('mongoose');



const Test = mongoose.Schema({
    testId:Number,
    test:String,
})



module.exports = mongoose.model("Test", Test, "Test");