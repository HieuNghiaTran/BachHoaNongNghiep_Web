var mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
var schema = new mongoose.Schema(
    {
        id_category: {
            type: String,
            ref: 'Category'
        },
        id_collection: {
            type: String,
            ref: 'Colection'
        },
        product_id: {
            type: String,
            require: true

        },
        name_product: String,
        price_product: String,
        images: [
            {
                url: {
                    type: String,
                    required: true
                },
                public_id: {
                    type: String,
                    required: true
                },
            }
        ],
        ratings: {
            type: Number,
            default: 0
        },
        stock: Number,
        date: Date,
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User',

                },
                name: {
                    type: String,

                },
                rating: {
                    type: Number,

                },
                comment: {
                    type: String,

                }
            }
        ],
        describe: String,

        soldQuantity: {
            type: Number,
            default: 0
        }

    }
);
schema.plugin(paginate);

var Products = mongoose.model('Products', schema, 'product');

module.exports = Products;