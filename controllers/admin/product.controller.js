import { MAX_WAREHOUSE_QUANTITY } from '../../utils/constanst';
const Product = require('../../models/product.model')
const ObjectId = require("mongodb").ObjectID;
const Origin = require('../../models/origin.model')
const TypeProduct = require('../../models/type-product.model')
const ProductUtils = require('../../utils/product.utils');

exports.list = async (req, res, next) => {
    try {
        const products = await ProductUtils.getList();
        res.render('admin/pages/product', { title: 'Quản lý sản phẩm', products });
    } catch (err) {
        console.log("err: ", err.message)
        res.status(500).render('admin/pages/product', { title: 'Quản lý sản phẩm', products: [], isSuccess: false });
    }
    // res.render('admin/auth/login', { title: 'Trang chủ' });
}

exports.detail = async (req, res, next) => {
    const { id } = req.query;
    console.log(id)

    const product = await ProductUtils.findById(id);
    res.render('admin/pages/product-detail', { title: 'Quản lý sản phẩm - Chi tiết', product });
    // res.render('admin/pages/product-detail', { title: 'Quản lý sản phẩm - Chi tiết', id});
}

exports.getDetailToEdit = async (req, res, next) => {
    const { id } = req.query;
    console.log(id)

    const product = await ProductUtils.findById(id);
    const types = await ProductUtils.getTypeProduct();
    const origins = await ProductUtils.getOriginProduct();

    res.render('admin/pages/product-edit', { title: 'Chỉnh sửa sản phẩm', product, types, origins });
    // res.render('admin/pages/product-detail', { title: 'Quản lý sản phẩm - Chi tiết', id});
}

exports.getDataToAddProduct = async (req, res, next) => {
    const types = await ProductUtils.getTypeProduct();
    const origins = await ProductUtils.getOriginProduct();

    res.render('admin/pages/product-add', { title: 'Thêm sản phẩm', types, origins });
}

exports.add = async (req, res, next) => {
    try {
        const data = req.body;
        const product = new Product(data);
        await product.save();

        res.send({ isSuccess: true, message: "Tạo sản phẩm thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Tạo sản phẩm thất bại!" });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await Product.deleteOne({ _id: ObjectId(req.body.id) })

        res.send({ isSuccess: true, message: "Xóa sản phẩm thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Xóa sản phẩm thất bại!" });
    }
}

exports.update = async (req, res, next) => {
    try {
        const { name, price, description, idTypeProduct, idOrigin, img } = req.body;
        const product = await Product.updateOne(
            { _id: ObjectId(req.body.idProduct) },
            { $set: { name: name, description, idTypeProduct, idOrigin, img, price: parseInt(price) } });

        //    console.log("product: ", product)
        res.send({ isSuccess: true, message: "Sửa sản phẩm thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Sửa sản phẩm thất bại!" });
    }
}


exports.listProductImport = async (req, res, next) => {
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
            await Product.updateOne({ _id: idProduct },
                {
                    $inc: { quantity: parseInt(-quantity) }
                })
            res.status(200).send({ isSuccess: true, message: "Xuất hàng thành công" });
        }
    } catch (err) {
        console.log("err: ", err.message);
        res.status(500).send({ isSuccess: false, message: "Xuất hàng thất bại!" });
    }
}
