const Detail_Order = require("../models/details_order");
const Order = require("../models/order");
const Products = require("../models/products");
const Detail_order = {
    detail: async (req, res) => {
        const id_order = req.params.id;
        try {
            const detail_order = await Detail_Order.find({ id_order: id_order });
            res.status(200).json(detail_order);
        } catch (error) {
            res.status(500).json(err);
        }
    },
    getAlldetail: async (req, res) => {
        try {
            const detail_order = await Detail_Order.find();
            res.status(200).json(detail_order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    post_detail_order: async (req, res) => {
        try {
            
            let order = await Order.findOne({ name: req.body.name});
            let product = [];
            for (let i = 0; i < req.body.product.length; i++) {
                product.push({
                    id_product: req.body.product[i].id,
                    name_product: req.body.product[i].name_product,
                    price_product: req.body.product[i].price_product,
                    count: req.body.product[i].quantity

                });
            }
            


    
            const data = {
                id_order: order._id,
                product: product,
            };
            for (let item of product) {
                const productToUpdate = await Products.findById(item.id_product);
                if (!productToUpdate) {
                    console.log("not found product")
                    continue;
                }
            
                const newStock = productToUpdate.stock - item.count;
                const newSoldQuantity = productToUpdate.soldQuantity + item.count;
            
                await Products.findByIdAndUpdate(item.id_product, {
                    $set: { soldQuantity: newSoldQuantity, stock: newStock }
                });
            }

            const detail_order = await Detail_Order.create(data);
            res.status(200).json(detail_order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
module.exports = Detail_order;
