const { model } = require("mongoose");
const Order = require("../models/order");
const Users = require("../models/user");

const OrderController = {
    submitOrder: async (req, res) => {
        try {

            console.log("aafsdas")
            const id_user = Users.findOne({ username: req.body.username });
            let data = {
                id_user: id_user._id,
                name: req.body.name,
                mail: req.body.email,
                note: req.body.note,
                total: req.body.total,
                address: req.body.address,
                status: req.body.status,
                feeship: req.body.feeship,
                create_time: req.body.create_time

            }

            const order = await Order.create(data)

            res.status(200).json(order)
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllOrder: async (req, res) => {
        try {
            const orders = await Order.find().sort({ _id: -1 });
            return res.status(200).json(orders);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    get_detail: async (req, res) => {

        const id_order = req.params.id

        const order = await Order.findOne({ _id: id_order }).populate(['id_user'])

        res.json(order)

    }

    , delete_Order: async (req, res) => {
        try {
            const id = req.params.id
            const resul = await Order.deleteOne({ id_order: id });

            res.status(200).json(resul)
        } catch (err) {
            res.status(500).json(err)
        }

    },

};

module.exports = OrderController;
