const Customer = require('../../models/customers.model');
const ObjectId = require("mongodb").ObjectID;

exports.delete = async (req, res, next) => {
    try {
        await Customer.deleteOne({ _id: ObjectId(req.body.id) })

        res.send({ isSuccess: true, message: "Xóa tài khoản khách hàng thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Xóa tài khoản khách hàng thất bại!" });
    }
}

exports.list = async (req, res, next) => {
    try {
        const customers = await Customer.find()
        console.log("customers", customers)
        res.render('admin/pages/account-customer', { title: 'Quản lý tài khoản khách hàng', customers});
    } catch (err) {
        console.log("err: ", err.message)
        res.status(500).render('admin/pages/account-customer', { title: 'Quản lý tài khoản khách hàng', customers: [] });
    }

}

exports.getPageAddCustomer = async (req, res, next) => {
    try {
        res.render('admin/pages/customer-add', { title: 'Tạo tài khoản khách hàng' });    
    } catch (err) {
        console.log("err: ", err.message)
        // res.status(500).render('admin/pages/account-customer', { title: 'Quản lý tài khoản khách hàng', customers: [] });
    }
}

exports.add = async (req, res, next) => {
    try {
        const data = req.body;
        const customer = new Customer(data);
        await customer.save();

        res.send({ isSuccess: true, message: "Tạo tài khoản khách hàng thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Tạo tài khoản khách hàng thất bại!" });
    }
}

exports.getDetail = async(req, res, next) => {
    try {
        const { id } = req.query;
        const customer = await Customer.findById(id);
        res.render('admin/pages/customer-detail', { title: 'Thông tin chi tiết', customer});
    } catch (err) {
        console.log("err getDetail: ", err.message)
       }
    
}

exports.update = async (req, res, next) => {
    try {
        const customer = await Customer.updateOne(
            { _id: ObjectId(req.body.id) },
            { $set: req.body });

           console.log("Customer: ", customer)
        res.send({ isSuccess: true, message: "Thay đổi thông tin khách hàng thành công" });
    } catch (err) {
        console.log("err update: ", err.message);
        res.send({ isSuccess: false, message: "Thay đổi thông tin khách hàng thất bại!" });
    }
}


exports.getDetailToEdit = async(req, res, next) => {
    try {
        const { id } = req.query;
        console.log("id", id);
    
        const customer = await Customer.findById(id);
        console.log("customer", customer);
        res.render('admin/pages/customer-edit', { title: 'Chỉnh sửa thông tin khách hàng', customer });
    } catch (err) {
        console.log("err: ", err.message)
    }
}
