exports.list = (req, res, next) => {
    res.render('admin/pages/product', { title: 'Quản lý đơn hàng'});
}

exports.detail = (req, res, next) => {
    res.render('admin/pages/product-detail', { title: 'Chi tiết đơn hàng'});
}