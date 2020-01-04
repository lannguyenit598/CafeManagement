const passport = require('passport');

exports.login = (req, res, next) => {
  res.render('admin/auth/login', { title: 'Đăng nhập', layout: false, message: undefined, email: undefined, password: undefined});
}

exports.logout = function(req,res){
  req.logout();
  res.redirect('/login');
}
