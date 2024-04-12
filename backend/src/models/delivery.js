var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {

        
        id_delivery: String,
        id_order:{
            type: String,
            ref: 'Order'
        },
        Ship_name: String
    
    }
);

var Delivery = mongoose.model('Delivery', schema, 'delivery');

module.exports = Delivery;