var express = require('express');
var router = express.Router();
import staffControllers from "../controllers/staff/payment.controller";

router.get('/', isLoggedIn, staffControllers.listProduct);
router.post('/', isLoggedIn, staffControllers.createBill);
router.get('/get-product', isLoggedIn, staffControllers.getListSearch);
router.get('/customer', isLoggedIn, staffControllers.getCusomterByPhone)
router.delete('/', isLoggedIn, staffControllers.deleteTest);
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
 }
