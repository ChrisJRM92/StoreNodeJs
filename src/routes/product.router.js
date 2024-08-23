const { getAll, create, remove, update, getOne} = require('../controllers/Product.controller');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerProduct = express.Router();

routerProduct.route('/').get(getAll).post(verifyJwt, create);
routerProduct.route('/:id').delete(verifyJwt, remove).put(verifyJwt, update).get(getOne);

module.exports = routerProduct;