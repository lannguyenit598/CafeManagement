import {STAFF} from '../../utils/constanst'

exports.home = (req, res, next) => {
    if(req.user.typeUser == STAFF) {
        return res.redirect("/home-staff");
    }
    return res.redirect("/bill")
    // return res.render('admin/pages/bill', { title: 'Doanh Thu'});
    // res.render('admin/auth/login', { title: 'Trang chủ' });
}