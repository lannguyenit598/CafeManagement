import * as moment from 'moment'
const Product = require('../../models/promotion.model')
const ObjectId = require("mongodb").ObjectID;

const Promotion = require('../../models/promotion.model')

exports.list = async (req, res, next) => {
    try {
        const promotions = await Promotion.find({ isDelete: false});
        // const results = promotions.map (item => {
        //     return { ...item, dateFrom: moment(item.dateFrom).format('DD-MM-YYYY'), dateTo: moment(item.dateTo).format('DD-MM-YYYY')  }
        //     })

        res.render('admin/pages/promotion', { title: 'Quản lý khuyến mãi', promotions });
    } catch (err) {
        console.log("err: ", err.message)
        res.status(500).render('admin/pages/promotion', { title: 'Quản lý khuyến mãi', promotion: [], isSuccess: false });
    }
    // res.render('admin/auth/login', { title: 'Trang chủ' });
}


exports.getPageAdd = async (req, res, next) => {
    res.render('admin/pages/promotion-add', { title: 'Tạo khuyến mãi' });
}

exports.add = async (req, res, next) => {
    try {
        const data = req.body;
        const promotion = new Promotion(data);
        await promotion.save();

        res.send({ isSuccess: true, message: "Tạo khuyến mãi thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Tạo khuyến mãi thất bại!" });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await Promotion.updateOne({ _id: ObjectId(req.body.id)}, {isDelete: true} )

        res.send({ isSuccess: true, message: "Xóa khuyến mãi thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Xóa khuyến mãi thất bại!" });
    }
}

exports.getToEdit = async (req, res, next) => {
    const { id } = req.query;

    const promotion = await Promotion.findOne({ _id: ObjectId(id) })
    res.render('admin/pages/promotion-edit', { title: 'Quản lý khuyến mãi - Chỉnh sửa', promotion });
}

exports.update = async (req, res, next) => {
    try {
        const promotion = await Promotion.updateOne(
            { _id: ObjectId(req.body.id) },
            { $set: req.body });

        //    console.log("promotion: ", promotion)
        res.send({ isSuccess: true, message: "Sửa khuyến mãi thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Sửa khuyến mãi thất bại!" });
    }
}