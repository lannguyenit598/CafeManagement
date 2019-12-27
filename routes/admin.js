
var express = require('express');
var router = express.Router();
import adminDashboardController from "../controllers/admin/dashboard.controller";
import adminProductController from "../controllers/admin/product.controller";

router.get('/', adminDashboardController.home);


// product
router.get('/product', adminProductController.get);
// router.get('/create', adminProductController.createData);


module.exports = router;

