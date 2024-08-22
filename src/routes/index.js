const express = require('express');
const routerUsers = require('./user.router');
const routerCategory = require('./category.router');
const router = express.Router();

router.use('/users', routerUsers)
router.use('/categories', routerCategory)

module.exports = router;