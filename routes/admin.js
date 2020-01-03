
var express = require('express');
var router = express.Router();

import adminDashboardController from "../controllers/admin/dashboard.controller";
import billController from "../controllers/admin/bill.controller";
import staffController from "../controllers/admin/staff.controller";
import statisticController from "../controllers/admin/statistic.controller";
import productController from "../controllers/admin/product.controller";
import authController from "../controllers/admin/auth.controller";
import promotionController from "../controllers/admin/promotion.controller";
// import importProductController from "../controllers/admin/import-product.controller";

router.get('/login', authController.login);
router.post('/login', authController.login_post);
router.get('/', isLoggedIn, adminDashboardController.home);

router.get('/bill', billController.list);
router.get('/bill-detail', billController.detail);

router.get('/staff', staffController.list);
router.get('/staff-detail', staffController.detail);
router.get('/staff-add',staffController.getPageAdd);
router.post('/staff-add',staffController.add);
router.delete('/staff-delete',staffController.delete);
router.get('/staff-edit',staffController.getPageEdit);
router.put('/staff-edit',staffController.update);

router.get('/statistic', statisticController.list);

//promotion
router.get('/promotion', promotionController.list);
router.get('/promotion-add', promotionController.getPageAdd);
router.post('/promotion-add', promotionController.add);
router.delete('/promotion-delete', promotionController.delete);
router.get('/promotion-edit', promotionController.getToEdit);
router.put('/promotion-edit', promotionController.update);
//product
router.get('/product', productController.list);
router.get('/product-detail', productController.detail);

router.get('/product-edit', productController.getDetailToEdit);
router.put('/product-edit', productController.update);
router.get('/product-add', productController.getDataToAddProduct);
router.post('/product-add', productController.add);
router.delete('/product-delete', productController.delete);

// router.get('/create', adminProductController.createData);

router.get('/import-product', productController.listProductImport);
router.put('/import-product', productController.importProduct);
router.put('/export-product', productController.exportProduct);

module.exports = router;

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated())
       return next();
   res.redirect('/login');
}

