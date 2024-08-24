const express = require('express');
const routerUsers = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const routerProductimg = require('./productimg.router');
const router = express.Router();

router.use('/users', routerUsers)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/cart', routerCart)
router.use('/purchase', routerPurchase)
router.use('/productimg', routerProductimg)

module.exports = router;