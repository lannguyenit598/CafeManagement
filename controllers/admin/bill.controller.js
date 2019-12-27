exports.list = (req, res, next) => {
    res.render('admin/pages/bill', { title: 'Quản lý đơn hàng'});
}