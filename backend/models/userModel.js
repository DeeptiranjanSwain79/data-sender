const mongoose = require('mongoose');
const validator = require('validator');
const autoIncrement = require("mongoose-auto-increment");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        maxlength: [50, "Name cannot exceed 50 characters"],
        minlength: [3, "Name should have more than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your E-mail ID"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid E-mail ID"]
    },
    phone: {
        type: Number,
        required: [true, "Please enter your phone number"],
    },
    hobbies: {
        type: [String],
        required: [true, "Please enter your Number"],
    },
});

autoIncrement.initialize(mongoose.connection);

userSchema.plugin(autoIncrement.plugin, 'user');

module.exports = mongoose.model('user', userSchema);