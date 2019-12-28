var express = require('express');
var router = express.Router();
import staffControllers from "../controllers/staff/payment.controller";

router.get('/',staffControllers.listProduct);
router.post('/', staffControllers.createBill);
router.get('/get-product', staffControllers.getListSearch);
router.get('/customer', staffControllers.getCusomterByPhone)
router.delete('/', staffControllers.deleteTest);
module.exports = router;
