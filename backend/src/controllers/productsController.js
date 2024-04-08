const { urlencoded } = require('body-parser');
const Products = require('../models/products')
const cloudinary = require('cloudinary')
const paginate = require('mongoose-paginate-v2');
const Users = require("../models/user");
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;
const productController = {


    detailProduct: async (req, res) => {
        try {
            let id = req.params.id
            const products = await Products.findOne({ _id: id })
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json(err)
        }


    },
    getAllProducts: async (req, res) => {

        try {
    
            let products = await Products.find().sort({ _id: -1 });
            res.status(200).json(products);

        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }

    },

    getWithCategory: async (req, res) => {

        try {

            let id_category = req.params.id_category
            let products
            id_category == "all" ? products = await Products.find() : products = await Products.find({ id_category: id_category })
            res.status(200).json(products);

        } catch (err) {
            res.status(500).json(err)

        }


    },
    newProductAdmin: async (req, res) => {
        try {

            let images = []
            if (typeof req.body.images === 'string') {
                images.push(req.body.images)
            } else {
                images = req.body.images
            }

            let imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'products'
                });
                console.log(result)
                if (result.error) {
                    res.status(500).send(result.error.message);
                    return;
                }
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }


            req.body.images = imagesLinks



            const product = await Products.create(req.body);

            res.status(201).json({
                success: true,
                product
            })








        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }



    },
    createProductReview: async (req, res, next) => {
        try {
            const { rating, comment, productId } = req.body;
    
            const user_req = await Users.findOne({ username: req.body.user.username });
    
            if (!user_req) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
    
            let data = {
                user: user_req._id,
                name: user_req.username,
                rating: Number(rating),
                comment: comment
            };
    
            const product = await Products.findById(productId);
    
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
    
            product.reviews.push(data);
            product.numOfReviews = product.reviews.length;
    
            product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    
            await product.save({ validateBeforeSave: false });
    
            res.status(200).json({ success: true, product }); 
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
    

    ,



    getProductWithSearch: async (req, res) => {
        try {
            let keyWord = req.params.value;
            console.log(keyWord);
            const getList = await Products.find();
            let newData = getList.filter((value) => {

                if (value.name_product && typeof value.name_product === 'string' ) {

                    return value.name_product.toUpperCase().indexOf(keyWord.toUpperCase()) !== -1
                } else {
                    return false; 
                }
            });
            res.status(200).json(newData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    PageginateProduct: async (req, res) => {


        try {
        
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10;
            const result = await Products.paginate({}, { page, limit: perPage, sort: { _id: -1 }  });
            res.json(result);

        } catch (err) {
            res.status(500).json(err)


        }


    },


    PageginateProductWithCategory: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10;
            const id = req.query.id;
            const result = await Products.paginate(
                { id_category: id },
                { page, limit: perPage, sort: { _id: -1 } }
            );
            res.json(result);
          
        } catch (err) {
            res.status(500).json(err);
        }
    },


    deleteProduct: async (req, res, next) => {

        try {
            const product = await Products.findById(req.params.id);
            for (let i = 0; i < product.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
            }
            await Products.deleteOne({ _id: req.params.id });
            res.status(200).json({
                success: true,
                message: 'Xóa sản phẩm thành công'
            })


        } catch (err) {
            res.status(500).json(err)
            console.log(err)
        }

    },
    updateProduct: async (req, res, next) => {

        try {
            let product = await Products.findById(req.params.id);
            let images = []
            if (typeof req.body.images === 'string') {
                images.push(req.body.images)
            } else {
                images = req.body.images
            }

            if (images !== undefined) {

                for (let i = 0; i < product.images.length; i++) {
                    const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
                }

                let imagesLinks = [];

                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: 'products'
                    });

                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    })
                }

                req.body.images = imagesLinks

            }

            product = await Products.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });

            res.status(200).json({

                product
            })

        } catch (err) {
            res.status(500).json(err)
            console.log(err)

        }

    },
    getProductHotDeal: async(req,res)=>{


        try {
        
            const page = 1;
            const perPage =6;
            const result = await Products.paginate({}, { page, limit: perPage, sort: { stock: -1 }  });
            res.json(result);

        } catch (err) {
            res.status(500).json(err)


        }

    },



}

module.exports = productController
