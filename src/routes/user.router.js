const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerUsers = express.Router();

routerUsers.route('/').get(verifyJwt, getAll).post(create);
routerUsers.route('/:id').delete(verifyJwt, remove).put(verifyJwt, update);
routerUsers.route('/login').post(login);

module.exports = routerUsers;