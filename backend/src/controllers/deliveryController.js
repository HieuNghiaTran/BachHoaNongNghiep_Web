const Delivery = require("../models/delivery")


const DeliveryController = {
    createShipDelivery: async (req, res) => {
        try {


            let result = await Delivery.create(req.body)
            res.status(200).json(result)

        } catch (err) {
            res.status(500).json(err)

        }


    }



}
module.exports = DeliveryController