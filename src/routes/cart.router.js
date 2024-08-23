const { getAll, create, remove, update, getOne} = require('../controllers/cart.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerCart = express.Router();

routerCart.route('/').get(verifyJwt, getAll).post(verifyJwt, create);
routerCart.route('/:id').delete(verifyJwt, remove).put(verifyJwt, update).get(verifyJwt, getOne);

module.exports = routerCart;