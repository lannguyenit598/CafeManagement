var express = require('express');
var router = express.Router();
import staffControllers from "../controllers/staff/payment.controller";

router.get('/',staffControllers.payment);

module.exports = router;
