
const ProductUtils = require('../../utils/product.utils');

exports.products = async (req, res, next) => {
    try {
        const products = await ProductUtils.getProduct();

        res.render('customers/list-product', { title: 'Trang chủ', products });
    } catch (err) {
        console.log("err: ", err.message)
        res.status(500).render('customers/list-product', { title: 'Trang chủ', products: [] });
    }
}

exports.getDetail = async (req, res, next) => {
    const { id } = req.query;
    console.log(id)
    const product = await ProductUtils.findById(id);
    res.render('customers/detail-product', { title: 'Chi tiết sản phẩm', product });
}
