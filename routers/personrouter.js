const express = require('express');
const personrouter = express.Router();
const person = require('./../models/person.js');
personrouter.get("/",async (req,res) => {//FOR DATA FETCHING..
  try{
    const response = await person.find();
    console.log("Data Fetched");
    res.status(200).json(response);
  }catch(Error){
    res.status(500).json({Error: "Internal server error.."});
  }
});
personrouter.get("/:worktype",async(req,res)=>{//FOR GETING DATA IN PARTICULAR WORKTYPE..
  const worktype = req.params.worktype;
  try{
    if(worktype == "chef" || worktype == "manager" || worktype == "waiter"){
      const response = await person.find({work:worktype});
      console.log("data fetched.")
      res.status(200).json(response);
    }
    else{
      res.status(404).json({ error: "Invalid work type." });
    }
  }catch(Error){
    console.log(Error);
    res.status(500).json({ error: "Internal server error" });
  }
});
personrouter.post("/",async (req,res)=>{ // FOR SAVING DATA..
  try{
    const data = req.body;
    const newdata = new person(data);
    const response = await newdata.save();
    console.log("Data Saved.");
    res.status(200).json(response);
  }catch(Error){
    res.status(500).json({Error: "Internal server Error"});
  }
})
personrouter.put("/:id",async(req,res) => {//FOR UPADTING THE DATA..
    try{
        const id = req.params.id;
        const updatedata = req.body;
        const response = await person.findByIdAndUpdate(id,updatedata, {
        new: true,//return new data
        runValidators: true,//valides all data;
    })
    if(!response){
        console.log("no person found");
        res.status(404).json({error: "Person not found."});
    }
    console.log("data Updated.");
    res.status(200).json(response);
    }catch(Error){
        console.log(Error);
        res.status(500).json({error: "Internal server error."})

    }
});
personrouter.delete("/:id",async(req,res)=>{//FOR DELETING DATA..
  try{
    const id = req.params.id;
  const response = await person.findByIdAndDelete(id);
  if(!response){
    console.log("No person found");
    res.status(404).json({error: "Person not found"});
  }
  console.log("Data deleted successfully");
  res.status(200).json({response});
}catch(Error){
  console.log(Error);
  res.status(500).json({error: "Internal server error."});
}
});
module.exports = personrouter;