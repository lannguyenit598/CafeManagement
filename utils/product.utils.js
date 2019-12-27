const Product = require('../models/product.model')

exports.getList = async () => {
    try {
        const products = await Product.find()
            .populate('idOrigin')
            .populate('idTypeProduct')
        return products;
    } catch (err) {
       throw new Error(err.message)
    }
}