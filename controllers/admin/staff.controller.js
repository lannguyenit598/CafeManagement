exports.list = (req, res, next) => {
    res.render('admin/pages/account-staff', { title: 'Quản lý tài khoản nhân viên'});
}

exports.detail = (req, res, next) => {
    const { id } = req.query
    res.render('admin/pages/staff-detail', { title: 'Chi tiết nhân viên', id});
}