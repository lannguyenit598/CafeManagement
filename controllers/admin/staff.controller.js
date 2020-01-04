const Staff = require('../../models/user.model')
var ObjectId = require("mongodb").ObjectID;
var bcrypt = require('bcryptjs');

exports.list = async (req, res, next) => {
    try {
        const staff = await Staff.find()
        res.render('admin/pages/account-staff', { title: 'Quản lý nhân viên', staff });
    } catch (err) {
        console.log("err: ", err.message)
        res.status(500).render('admin/pages/product', { title: 'Quản lý nhân viên', staff: [], isSuccess: false });
    }
}
exports.getPageAdd = async (req, res, next) => {
    res.render('admin/pages/staff-add', { title: 'Thêm Mới Nhân Viên' });
}
exports.add = async (req, res, next) => {
    const saltRounds = 10;
    try {
        var password = bcrypt.hashSync(req.body.password, saltRounds);
        const name = req.body.name;
        const phone = req.body.phone;
        const address = req.body.address;
        const email = req.body.email;
        const data = { name, phone, address, email, password };
        const staff = await Staff.findOne({ email });
        if (staff == null) {
            console.log("chua ton tai ");
            const newstaff = new Staff(data);
            await newstaff.save();
            res.send({ isSuccess: true, message: "Thành Công!!!" });
        }
        else {
            res.send({ isSuccess: true, message: "Email đã tồn tại!!!" });
        }
    }
    catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Có Lỗi xảy ra khi tạo mới nhân viên!!!" });
    }

}
exports.detail = (req, res, next) => {
    const { id } = req.query
    res.render('admin/pages/staff-detail', { title: 'Chi tiết nhân viên', id });
}

exports.delete = async (req, res, next) => {
    try {
        await Staff.deleteOne({ _id: ObjectId(req.body.id) })
        res.send({ isSuccess: true, message: "Xóa Nhân viên thành công!!!" });
    } catch (err) {
        res.send({ isSuccess: false, message: "Thất bại!" });
    }
}

exports.getPageEdit = async (req, res, next) => {
    const { id } = req.query;
    const staff = await Staff.findOne({ _id: ObjectId(id) })
    res.render('admin/pages/staff-edit', { title: 'Chỉnh sửa Nhân Viên', staff });
}

exports.update = async (req, res, next) => {
    try {
        const { name, phone, address, email, password } = req.body;
        const staff = await Staff.updateOne(
            { _id: ObjectId(req.body.id) },
            { $set: req.body });

        res.send({ isSuccess: true, message: "Sửa thông tin thành công" });

    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Có Lỗi Xảy ra!" });
    }
}