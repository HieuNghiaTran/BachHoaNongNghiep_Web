const mongoose = require('mongoose');

var userschema = new mongoose.Schema(
    {
        id_permission: {
            type: String,
            ref: 'Permission'
        },
        username: String,
        password: String,
        fullname: String,
        email: String,
        phone: String

    }
);

let Users = mongoose.model("user", userschema);

module.exports = Users;