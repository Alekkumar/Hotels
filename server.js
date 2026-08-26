//import express from 'express'
const express = require("express");
const app = express()
//const db = require("/.connectig.js");
const db = require("./db.js");
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const person = require('./models/person.js');
const menu = require("./models/menu.js");
app.get('/', (req, res) => {
  res.send('BABA KA DHABHA');
})
//app.post("/person",async(req,res)=>{
  // const data = req.body;
  // const newPerson = new person(data);
  // // newPerson.name = data.name;
  // // newPerson.age = data.age;
  // // newPerson.mobile = data.mobile;
  // // newPerson.email = data.email;
  // // newPerson.addresss = data.addresss;
  // newPerson.save((error,person) => {
  //   if(error){
  //     console.log("Error :",error);
  //     res.status(500).json({error:"Internal sever error"})
  //   }else{
  //     console.log("data saved");
  //     res.status(200).json(savedperson);
  //   }
  // })
// try{
//   const data = req.body
//   const newPerson = new person(data);
//   const response = await newPerson.save();
//   console.log("data saved");
//   res.status(200).json(response);
// }catch(err){
//   console.log(err);
//   res.status(500).json({error : "Internal server error"});
// }
// })
// app.get("/person/:worktype",async(req,res)=>{
//   const worktype = req.params.worktype;
//   try{
//     if(worktype == "chef" || worktype == "manager" || worktype == "waiter"){
//       const response = await person.find({work:worktype});
//       console.log("data fetched.")
//       res.status(200).json(response);
//     }
//     else{
//       res.status(400).json({Error:"Inavlid work type."});
//     }
//   }catch{
//     res.status(400).json({error: "Internal server error"});
//   }
// })

const personrouter = require('./routers/personrouter.js');
//app.use('/person',personrouter);
app.use("/person",personrouter);

const menurouter = require('./routers/menurouters.js');
app.use("/menu",menurouter);


// app.get('/data',async (req,res) => {
//   try{
//     const dat = await person.find();
//     console.log("data fetched");
//   res.status(200).json(dat);
//   }catch(err){
//     console.log(err);
//   res.status(500).json({error : "Internal server error"});
//   }
  
// })
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
