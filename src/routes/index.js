const express = require('express');
const routerUsers = require('./user.router');
const router = express.Router();

router.use('/users', routerUsers)

module.exports = router;