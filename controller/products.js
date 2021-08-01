const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => { 
    console.log(req.body);
    const createdProduct = await productModel.create(req.body);
    console.log(createdProduct);
    res.status(201).json(createdProduct);
};