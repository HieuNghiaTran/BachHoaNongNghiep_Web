const Permission = require("../models/permission")

const PermissionController = {
    create: async (req, res) => {

        try {
            const data = await Permission.create(req.body)
            res.status(200).json(data)

        } catch (err) {

            res.status(500).json(err)

        }

    },

    getAll: async (req, res) => {

        try {
            
            const data = await Permission.find()
            res.status(200).json(data)



        } catch (err) {

            res.status(500).json(err)

        }


    },





}




module.exports = PermissionController