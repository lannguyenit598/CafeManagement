const passport = require('passport');
import User from '../../models/user.model';
import {STAFF} from '../../utils/constanst'

exports.login = (req, res, next) => {
  res.render('admin/auth/login', { title: 'Đăng nhập', layout: false, message: undefined, email: undefined, password: undefined});
}

exports.login_post = (req, res, next) => {
  const { email, password } = req.body

  if (!email) {
    res.status(500).render('admin/auth/login', 
      { title: 'Đăng nhập', 
        layout: false, 
        message: 'Vui lòng nhập email.', 
        email: email, 
        password: password
    });
  }

  if (!password) {
    res.status(500).render('admin/auth/login', 
      { title: 'Đăng nhập', 
        layout: false, 
        message: 'Vui lòng nhập mật khẩu.', 
        email: email, 
        password: password
    });
  }

  passport.authenticate('local', { session: false }, async (err, passportUser) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      // localStorage.setItem('user', passportUser);
      if(passportUser.typeUser !== STAFF) {
        res.render('admin/pages/statistic', { 
          title: 'Doanh thu',
          user: passportUser
        });
      }
      else {
        try {
          const products = await ProductUtils.getList();
          res.render('staff/payment', { title: 'Bán hàng', products, user: passportUser});
        } catch (err) {
            console.log("err: ", err.message)
            res.status(500).render('staff/payment', { title: 'Bán hàng', products: [], user: passportUser });
        }
      }
      
    }
    res.status(500).render('admin/auth/login', 
      { title: 'Đăng nhập', 
        layout: false, 
        message: 'Tài khoản hoặc mật khẩu không đúng.', 
        email: email, 
        password: password
    });
  })(req, res, next);
};
