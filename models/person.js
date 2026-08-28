const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const personschema = new mongoose.Schema({
    name: {
        type: String,
        //require: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    addresss: {
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

personschema.pre('save', async function(next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(person.password, salt);
        person.password = hashedpassword;
        this.password = hashedpassword;
    } catch (err) {
        return next(err);
    }
});
//COMPARING PASSWORD:
personschema.methods.comparepassword = async function (incomingpassword) {
    try {
        const ismatch = await bcrypt.compare(incomingpassword, this.password);
        return ismatch;
    } catch (Error) {
        throw Error;
    }
}

//model
const person = mongoose.model('person', personschema);
module.exports = person;