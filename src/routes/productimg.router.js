const { getAll, create, remove, update, login } = require('../controllers/productimg.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');
const upload = require('../utils/multer');

const routerProductimg = express.Router();

routerProductimg.route('/').get(getAll).post(upload.single('image'), create);
routerProductimg.route('/:id').delete(remove)
// .put(verifyJwt, update);
// routerUsers.route('/login').post(login);

module.exports = routerProductimg;