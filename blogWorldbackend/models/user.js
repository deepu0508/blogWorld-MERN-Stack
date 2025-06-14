const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    usernameHash: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mailid: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    time: {
        type: Date,
        default:Date.now()
    }
});

const User = mongoose.model("Users",userSchema);
module.exports = User;