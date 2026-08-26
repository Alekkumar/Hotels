var a=1;
let b = 2;
var ans = a+b;
console.log(ans);
console.log(typeof(ans));
const car =["Alek","Arpit","Arun","Prince"];
console.log(car);
car.push("Amit");
console.log(car);
console.log(car[2]);
let c=20;
if(c<18){
    console.log("minor");
}
else{
    console.log("Adult");
}
let d=10;
for(let i=0;i<=d;i++){
    console.log(i);
}
const person = {
    Name: "Alek",
    Class:"sh",
    Roll: 46,
    hobbies: ["Playing game","Reading book","Coding"]
}
console.log(person.hobbies);
var agess = [15,36,47,28,12];
var result = agess.filter(checkage);
function checkage(agess){
    return agess<=18;
}
console.log(result);
var prompt = require('prompt-sync')();
var age = prompt("Enter your age: ");
if (age<=18){
    console.log("Minor");
}
else{
    console.log("Adult");
}
