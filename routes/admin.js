
var express = require('express');
var router = express.Router();
import adminDashboardController from "../controllers/admin/dashboard.controller";
import billController from "../controllers/admin/bill.controller";
import staffController from "../controllers/admin/staff.controller";
import statisticController from "../controllers/admin/statistic.controller";
import productController from "../controllers/admin/product.controller";
import importProductController from "../controllers/admin/import-product.controller";

router.get('/', adminDashboardController.home);

router.get('/bill', billController.list);

router.get('/staff', staffController.list);
router.get('/staff-detail', staffController.detail);

router.get('/statistic', statisticController.list);

router.get('/product', productController.list);
router.get('/product-detail', productController.detail);

router.get('/import-product', importProductController.list);

module.exports = router;

