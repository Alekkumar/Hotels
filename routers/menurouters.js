const express = require("express");
const menurouter = express.Router();
const menu = require("./../models/menu.js");
menurouter.get("/",async (req,res) => { //FOR FETCHING DATA..
    try{
        const data = await menu.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({Error: "Internal sever error"});
    }
});
menurouter.post("/",async(req,res) =>{ //FOR DATA SAVING...
    try{
        const data = req.body;
        const newmenu = new menu(data);
        const response = await newmenu.save();
        console.log("Data Saved");
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({Error: "Internal server error"});
    }
});
menurouter.get("/:taste",async (req,res) => {//DATA FETCHING BY PURTICULAR TASTE...
    try{
        const taste = req.params.taste;
        if(taste == "salty" || taste == "sweet" || taste == "sour"){
            const response = await menu.find({taste:taste});
            console.log("Data Fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({Error: "Taste not found."});
        }
    }catch(error){
        res.status(500).json({Error: "Internal server error"});
    }
});
menurouter.put("/:id",async (req,res) => { // FOR UPDATING DATA...
    try{
        const id = req.params.id;
        const updatedata = req.body;
        const response = await menu.findByIdAndUpdate(id,updatedata,{
            new:true,
            runValidators:true
        });
        if(!response){
            console.log("Menu not found.");
            res.status(404).json({Error: "Menu not find."})
        }
        console.log("Data updated.");
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({Error: "Internal server error."});
    }
});
menurouter.delete("/:id",async (req,res) =>{//FOR DELETING DATA..
    try{
        const id = req.params.id;
        const response = await menu.findByIdAndDelete(id);
        if(!response){
            console.log("Menu not found.");
            res.status(404).json({Error: "Menu not found."});
        }
        console.log("Data deleted successfully");
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({Error: "Internal Server error."});
    }
});
module.exports = menurouter;