const { model } = require("mongoose");
const Order = require("../models/order");
const Users = require("../models/user");

const OrderController = {
    submitOrder: async (req, res) => {
        try {


            const user = await Users.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            let data = {
                id_user: user.id,
                name: req.body.name,
                mail: req.body.email,
                note: req.body.note,
                phone: req.body.phone,
                total: req.body.total,
                address: req.body.address,
                status: req.body.status,
                feeship: req.body.feeship,
                create_time: req.body.create_time,
                payment_status:req.body.payment_status

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

    },
    getOrderWithPhoneNumber: async (req, res) => {

        const phone = req.query.phone
        const order = await Order.find({ phone: phone })
        console.log(order)
        res.json(order);

    }

    , delete_Order: async (req, res) => {
        try {
            const id = req.params.id
            const resul = await Order.deleteOne({ _id: id });

            res.status(200).json(resul)
        } catch (err) {
            res.status(500).json(err)
        }

    },


    getOrderCustormer: async (req, res) => {
        try {
            const user = await Users.findOne({ username: req.query.username });
            console.log(user)
            let order = await Order.find({ id_user: user.id })
            res.status(200).json(order)
        } catch (err) {
            res.status(500).json(err)


        }



    },

    UpdateStatusOrder: async (req, res) => {
        try {

            let order = await Order.findById(req.body.id)
            order.status = req.body.status
            await order.save()
            res.status(200).json(order)
        } catch (err) {
            res.status(500).json(err)


        }



    }



};

module.exports = OrderController;
