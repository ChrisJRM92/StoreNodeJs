const supertest = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Cart = require("../models/Cart");
require('../models')

let TOKEN
let userId
let categoryId;
let productId;
let product;
let cartId;
let cart
let purchaseId;

const BASE_URL = '/api/v1/purchase';
const BASE_URL_LOGIN = '/api/v1/users/login';

beforeAll(async()=>{
  const user = {
    email: "leo@mail.com",
    password: "leo12345"
  };

  const res = await supertest(app).post(BASE_URL_LOGIN).send(user);
  TOKEN = res.body.token;
  userId = res.body.user.id

  const category = {
    name: "shoes"
  };

  const categoryCreate = await Category.create(category);
  categoryId = categoryCreate.id;

  product = {
    title: "Adidas X18",
    description: "Lorem ipsun adidas shoes",
    price: 24.99,
    categoryId: categoryCreate.id
  }

  const productCreate = await Product.create(product);
  productId = productCreate.id;

  cart = {
    userId: userId,
    productId: productCreate.id,
    quantity: 3
  };

  const cartCreate = await Cart.create(cart);
  cartId = cartCreate.id
});

test("Create Post --> '/purchase' should return 200", async()=>{

});