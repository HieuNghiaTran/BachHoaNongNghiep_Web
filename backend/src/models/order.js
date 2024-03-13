var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: {
            type: String,
            ref: 'Users'
        },
        name: String,
        mail:String,
        phone:String,
        note: {
            type: String,
        },

        total: Number,
        address: String,
        status: String,
        feeship: Number,
        create_time: String,
        payment_id:String,
        payment_status:String

    }
);

var Order = mongoose.model('Order', schema, 'order');

module.exports = Order;