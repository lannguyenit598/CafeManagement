import {STAFF} from '../../utils/constanst'

exports.home = (req, res, next) => {
    if(req.user.typeUser == STAFF) {
        return res.redirect("/home-staff");
    }
    return res.render('admin/pages/dashboard', { title: 'Quản lý'});
    // res.render('admin/auth/login', { title: 'Trang chủ' });
}