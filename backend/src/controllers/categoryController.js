const Category = require("../models/category");
const Products = require('../models/products')
const CategoryController = {
    getAllCategory: async (req, res) => {
        try {
            const category = await Category.find();
            res.status(200).json(category);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);

        }
    },

    addCategory: async (req, res) => {


        try {
            const newcategory = new Category(req.body);
            const saved = await newcategory.save();
            res.status(201).json(saved);
        } catch (err) {

            console.log(err);
            res.status(500).json(err);

        }
    },


    getNameCategory: async (req, res) => {
        try {
            let id = req.params.id
            const result = await Category.findOne({ _id: id })
            res.status(201).json(result);
        } catch (err) {

            console.log(err);
            res.status(500).json(err);

       }



    },
    getStockValueCategory: async(req, res)=>{

    },


}

module.exports = CategoryController