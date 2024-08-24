const { getAll, create, remove, update, login } = require('../controllers/purchase.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerPurchase = express.Router();

routerPurchase.route('/').get(verifyJwt, getAll).post(create);
// routerUsers.route('/:id').delete(verifyJwt, remove).put(verifyJwt, update);
// routerUsers.route('/login').post(login);

module.exports = routerPurchase;