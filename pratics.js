// function add(a,b) {
//     return a+b;
// }

// var add = function(a,b){
//     return a+b
// }

// var add = (a,b) =>{return a+b;}
// var add = (a,b) => a+b;
// var r= add(1,3);
// console.log(r);

// (function(a,b){
//     console.log(a+b);
// })(4,7);

// var os = require("os");
// var u = os.userInfo();
// console.log(u);
// console.log(u.username);
// var prompt = require('prompt-sync')();
// var age = prompt("Enter your age: ");
// if (age<=112){
//     console.log("Minor");
// }
// else{
//     console.log("Adult");
// }


// function callback(){
//     console.log("Call back is called");
// }
// const add = function(a,b,callback){
//     var r = a+b;
//     console.log(r);
//     callback();
// }
// add(3,500,callback);

// const add = function(a,b,alek){
//     var r = a+b;
//     console.log(r);
//     alek();
// }
// add(2,3,() => console.log("Callback is called"));




// var fs = require("fs");
// var os = require("os");
// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile("greeting.txt","hi" + user.username+"!\n", ()=>{console.log("file is createrd")});

// console.log(os);


// const connect = require("./connectig.js");
// console.log("server file is loaded");
// var age = connect.age;
// var result = connect.add(age+20,30);
// console.log(age);
// console.log(result);





var _ = require('lodash');
var data = [1,1,1,2,4,3,2,3,4,5,4,6,5454,4,35,78,6,4,23,45,33,33,33,5454];
var filter = _.uniq(data);
console.log(filter);
console.log(_.isString("Alek"));
