
const Carts = require('../models/cart')


const cartController = {
    addCart: async (req, res) => {
        try {
                const cart = await Carts.create(req.body);
                res.status(201).json(cart);
        
        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }
    },
    getAllCart: async (req, res) => {
        try {
            const users = await Carts.find();
            res.status(200).json(users);
        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }
    }
};

module.exports = cartController;