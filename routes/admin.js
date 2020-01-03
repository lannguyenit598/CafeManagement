
var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
import adminDashboardController from "../controllers/admin/dashboard.controller";
import billController from "../controllers/admin/bill.controller";
import staffController from "../controllers/admin/staff.controller";
import statisticController from "../controllers/admin/statistic.controller";
import productController from "../controllers/admin/product.controller";
import authController from "../controllers/admin/auth.controller";
import promotionController from "../controllers/admin/promotion.controller";

// import importProductController from "../controllers/admin/import-product.controller";

    router.get('/login', authController.login);
    router.post('/login', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true 
    }));
    router.get('/', isLoggedIn, adminDashboardController.home);

    router.get('/bill', isLoggedIn, billController.list);
    router.get('/bill-detail', isLoggedIn, billController.detail);

    router.get('/staff', isLoggedIn, staffController.list);
    router.get('/staff-detail', isLoggedIn, staffController.detail);
    router.get('/staff-add', isLoggedIn, staffController.getPageAdd);
    router.post('/staff-add', isLoggedIn, staffController.add);
    router.delete('/staff-delete', isLoggedIn, staffController.delete);
    router.get('/staff-edit',  isLoggedIn, staffController.getPageEdit);
    router.put('/staff-edit', isLoggedIn, staffController.update);

    router.get('/statistic', isLoggedIn, statisticController.list);

    //promotion
    router.get('/promotion', isLoggedIn, promotionController.list);
    router.get('/promotion-add', isLoggedIn, promotionController.getPageAdd);
    router.post('/promotion-add', isLoggedIn, promotionController.add);
    router.delete('/promotion-delete', isLoggedIn, promotionController.delete);
    router.get('/promotion-edit', isLoggedIn, promotionController.getToEdit);
    router.put('/promotion-edit', isLoggedIn, promotionController.update);
    //product
    router.get('/product', isLoggedIn, productController.list);
    router.get('/product-detail', isLoggedIn, productController.detail);

    router.get('/product-edit', isLoggedIn, productController.getDetailToEdit);
    router.put('/product-edit', isLoggedIn, productController.update);
    router.get('/product-add', isLoggedIn, productController.getDataToAddProduct);
    router.post('/product-add', isLoggedIn, productController.add);
    router.delete('/product-delete', isLoggedIn, productController.delete);

    // router.get('/create', adminProductController.createData);

    router.get('/import-product', isLoggedIn, productController.listProductImport);
    router.put('/import-product', isLoggedIn, productController.importProduct);
    router.put('/export-product', isLoggedIn, productController.exportProduct);

module.exports = router;

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated())
       return next();
   res.redirect('/login');
}

