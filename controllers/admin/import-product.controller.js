

import { MAX_WAREHOUSE_QUANTITY} from '../../utils/constanst'
const ProductUtils = require('../../utils/product.utils');
const Product = require('../../models/product.model')
const ObjectId = require("mongodb").ObjectID;


exports.list = async (req, res, next) => {
    try {
        const products = await ProductUtils.getList();

        res.render('admin/pages/import-product', { title: 'Quản lý nhập hàng', products });
    } catch (err) {
        console.log("err: ", err.message)
        res.status(500).render('admin/pages/import-product', { title: 'Quản lý nhập hàng', products: [], isSuccess: false });
    }
}
// Manage import product
exports.importProduct = async (req, res, next) => {
    try {
        // console.log("req: ", req);
        // console.log("req: ", req.body);
        const { quantity, idProduct } = req.body;
        console.log("quan: ", quantity, "id: ", idProduct)
        // check WAREHOUSE
        // get sum quantity product

        const sum = await Product.aggregate([{
            $group: {
                _id: '',
                quantity: { $sum: '$quantity' }
            }
        }])
        const currentSumQuantity = sum[0].quantity
        console.log("curr sum: ", currentSumQuantity)
        console.log(currentSumQuantity + parseInt(quantity) > MAX_WAREHOUSE_QUANTITY)
        console.log(currentSumQuantity + parseInt(quantity))
        console.log(MAX_WAREHOUSE_QUANTITY)

        if (parseInt(currentSumQuantity) + parseInt(quantity) <= parseInt(MAX_WAREHOUSE_QUANTITY)) {
            const product = await Product.updateOne({ _id: new ObjectId(idProduct) },
                { $inc: { quantity: parseInt(quantity) } }
            );
            console.log("finish: ", product);

            res.status(200).send({ isSuccess: true, message: "Nhập hàng thành công", product });
        } else {
            console.log("finish err ");

            res.status(500).send({ isSuccess: false, message: "Kho hàng không đủ chỗ" });
        }


    } catch (err) {
        console.log("err: ", err.message);
        res.status(500).send({ isSuccess: false, message: "Nhập hàng thất bại!" });
    }
}

// Manage export product
exports.exportProduct = async (req, res, next) => {
    try {
        const { quantity, idProduct } = req.body;
        console.log("quan: ", quantity, "id: ", idProduct)
        // check is enough quantity
        const currentProduct = await Product.findById(idProduct)
        if (currentProduct.quantity < quantity) {
            res.status(500).send({ isSuccess: false, message: "Không đủ hàng" });
        } else {
            await Product.updateOne({_id: idProduct}, 
                {
                    $inc: {quantity: parseInt(-quantity)}
                })
                res.status(200).send({ isSuccess: true, message: "Xuất hàng thành công" });
        }
    } catch (err) {
        console.log("err: ", err.message);
        res.status(500).send({ isSuccess: false, message: "Xuất hàng thất bại!" });
    }
}


