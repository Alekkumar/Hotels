const mongoose = require("mongoose");
const personschema = new mongoose.Schema({
    name: {
        type: String,
        //require: true
    },
    age: {
            type:Number
    },
    work:{
        type:String,
        enum:["chef","waiter","manager"],
        required: true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    addresss:{
        type:String
    }
});


//model
const person = mongoose.model('person',personschema);
module.exports = person;