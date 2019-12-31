
var express = require('express');
var router = express.Router();
import adminDashboardController from "../controllers/admin/dashboard.controller";
import billController from "../controllers/admin/bill.controller";
import staffController from "../controllers/admin/staff.controller";
import statisticController from "../controllers/admin/statistic.controller";
import productController from "../controllers/admin/product.controller";
// import importProductController from "../controllers/admin/import-product.controller";

router.get('/', adminDashboardController.home);

router.get('/bill', billController.list);
router.get('/bill-detail', billController.detail);

router.get('/staff', staffController.list);
router.get('/staff-detail', staffController.detail);

router.get('/statistic', statisticController.list);

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

