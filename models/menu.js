const mongoose = require("mongoose");
const menusechema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    taste:{
        type:String,
        enum:["Salty","Sweet","Sour"]
    },
    Price:{
        type:Number,
        require:true
    },
}
);
const menu = mongoose.model('menu',menusechema);//FOR EXPORTING THE FILE IN SERVER FILE;
module.exports = menu;

