const { getAll, create, remove, update, login } = require('../controllers/productimg.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerProductimg = express.Router();

routerProductimg.route('/').get(verifyJwt, getAll).post(verifyJwt, create);
routerProductimg.route('/:id').delete(verifyJwt, remove)
// .put(verifyJwt, update);
// routerUsers.route('/login').post(login);

module.exports = routerProductimg;