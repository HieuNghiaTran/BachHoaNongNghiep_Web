const Colection = require('../models/colections');

const ColectionController = {
    getAllColecion: async (req, res) => {
        try {

            let id_category = req.query.id_category
            const colection = await Colection.find({id_catory :id_category});
            res.status(200).json(colection);
        } catch (err) {
            console.log(err);
            
        }
    },

    addCollection: async (req, res) => {
        try {
            const newColection = new Colection(req.body);
            const saved = await newColection.save();
            res.status(201).json(saved);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = ColectionController;
