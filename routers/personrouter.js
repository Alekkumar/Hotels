const express = require('express');
const personrouter = express.Router();
const person = require('./../models/person.js');
const passport = require('passport');
const { jwtauthmiddleware, generatetoken } = require('./../jwt.js');

//const person = require('./models/person.js');

personrouter.get("/", async (req, res) => {//FOR DATA FETCHING..
  try {
    const response = await person.find();
    console.log("Data Fetched");
    res.status(200).json(response);
  } catch (Error) {
    res.status(500).json({ Error: "Internal server error.." });
  }
});
personrouter.get("/profile", jwtauthmiddleware, async (req, res) => {
  try {
    const userdata = req.user;
    console.log("User data: ", userdata);

    const userid = userdata.id;
    const user = await person.findOne({ _id: userid });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error.message || "Internal server error" });
  }
});
personrouter.get("/:worktype", async (req, res) => {//FOR GETING DATA IN PARTICULAR WORKTYPE..
  const worktype = req.params.worktype;
  try {
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await person.find({ work: worktype });
      console.log("data fetched.")
      res.status(200).json(response);
    }
    else {
      res.status(404).json({ error: "Invalid work type." });
    }
  } catch (Error) {
    console.log(Error);
    res.status(500).json({ error: "Internal server error" });
  }
})
personrouter.post("/signup", async (req, res) => { // FOR SAVING DATA..
  try {
    const data = req.body;
    const newdata = new person(data);
    const response = await newdata.save();
    console.log("Data Saved.");
    //creating payload;
    const payload = {
      id: response.id,
      username: response.username
    };
    //creating token;
    const token = generatetoken(payload);
    console.log("token is : ", token);

    res.status(200).json({ response: response, token: token });

  } catch (Error) {
    console.log(Error);
    res.status(500).json({ Error: Error.message || "Internal server Error" });
  }
});
//FOR LOGIN...
personrouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await person.findOne({ username: username });
    if (!user || !(await user.comparepassword(password))) {
      return res.status(401).json({ Error: "PLEASE ENTER CORRECT USERNAME OR PASSWORD" });
    }
    //creating payload;
    const payload = {
      id: user.id,
      username: user.username
    };
    //creating token;
    const token = generatetoken(payload);
    console.log("token is : ", token);
    //SENDING TOKEN IN RESPONSE..
    res.json({ token: token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ Error: "Internal server error" });
  }
});
personrouter.put("/:id", async (req, res) => {//FOR UPADTING THE DATA..
  try {
    const id = req.params.id;
    const updatedata = req.body;
    const response = await person.findByIdAndUpdate(id, updatedata, {
      new: true,//return new data
      runValidators: true,//valides all data;
    })
    if (!response) {
      console.log("no person found");
      res.status(404).json({ error: "Person not found." });
    }
    console.log("data Updated.");
    res.status(200).json(response);
  } catch (Error) {
    console.log(Error);
    res.status(500).json({ error: "Internal server error." })

  }
});
personrouter.delete("/:id", async (req, res) => {//FOR DELETING DATA..
  try {
    const id = req.params.id;
    const response = await person.findByIdAndDelete(id);
    if (!response) {
      console.log("No person found");
      res.status(404).json({ error: "Person not found" });
    }
    console.log("Data deleted successfully");
    res.status(200).json({ response });
  } catch (Error) {
    console.log(Error);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = personrouter;