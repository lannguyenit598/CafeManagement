
var express = require('express');
var router = express.Router();
import adminDashboardController from "../controllers/admin/dashboard.controller";

router.get('/', adminDashboardController.home);


module.exports = router;

