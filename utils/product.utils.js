const Product = require('../models/product.model')
const TypeProduct = require('../models/type-product.model')
const Origin = require('../models/origin.model')
const ObjectId = require("mongodb").ObjectID;


exports.getList = async () => {
    try {
        const products = await Product.find({quantity: {$gt: 0}})
            .populate('idOrigin')
            .populate('idTypeProduct')
        return products;
    } catch (err) {
       throw new Error(err.message)
    }
}

exports.getProduct = async () => {
    try {
        const products = await Product.find({quantity: {$gt: 0}})
            .populate('idOrigin')
            .populate('idTypeProduct')
            .sort({price: -1})
            .limit(6)
        return products;
    } catch (err) {
       throw new Error(err.message)
    }
}

exports.findById = async (id) => {
   return await Product.findById(ObjectId(id))
        .populate('idOrigin')
        .populate('idTypeProduct')
}

exports.getTypeProduct = async () => {
    return await TypeProduct.find()
}

exports.getOriginProduct = async () => {
    return await Origin.find()
}