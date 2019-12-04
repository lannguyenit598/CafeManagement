var express = require('express');
var router = express.Router();
import productsControllers from "../controllers/customers/products";

/* GET home page. */
router.get('/',productsControllers.products);

module.exports = router;
