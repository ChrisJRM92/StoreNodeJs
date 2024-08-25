const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const create1 = catchError(async(req, res) => {
  const user1={
    "firstName": "Leonel",
    "lastName": "Mesi",
    "email": "mesi@mail.com",
    "password": "leo12345",
    "phone": "0123456789"
  }
  await User.create(user1);
});

const create2 = catchError(async(req, res) => {
  const user2={
    "firstName": "Ronaldo",
    "lastName": "Ron",
    "email": "ronaldo@mail.com",
    "password": "ronaldo12345",
    "phone": "0123457789"
  }
  const result = await User.create(user2);
});

create2();
create1();
console.log("Users create 👌" )