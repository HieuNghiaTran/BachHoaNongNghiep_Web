const Detail_Order = require("../models/details_order");
const Order = require("../models/order");
const Detail_order = {
    detail: async (req, res) => {
        const id_order = req.params.id;
        try {
            const detail_order = await Detail_Order.find({ id_order: id_order }).populate('id_product');
            res.json(detail_order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAlldetail: async (req, res) => {
        const id_order = req.params.id;
        try {
            const detail_order = await Detail_Order.find();
            res.status(200).json(detail_order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    post_detail_order: async (req, res) => {
        try {
            
            let id_order = await Order.findOne({ name: req.body.name });
            let product = [];
            for (let i = 0; i < req.body.product.length; i++) {
                product.push({
                    id_product: req.body.product[i].id_product,
                    name_product: req.body.product[i].name_product,
                    price_product: req.body.product[i].price_product,
                    count: req.body.product[i].quantity
                });
            }
            console.log(product);
            const data = {
                id_order: id_order._id,
                product: product,
            };
            const detail_order = await Detail_Order.create(data);
            res.status(200).json(detail_order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
module.exports = Detail_order;
