//modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//schema
const registerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    confirmPassword: {
        type: String,
        required: true,
        unique: true,
    },
});

//hash
registerSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

//model
const Register = mongoose.model('Register', registerSchema);
//export
module.exports = Register;
