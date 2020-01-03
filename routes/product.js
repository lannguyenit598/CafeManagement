var express = require('express');
var router = express.Router();
import productsControllers from "../controllers/customers/products.controller";

router.get('/',productsControllers.getDetail);
module.exports = router;