const supertest = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Cart = require("../models/Cart");
const Purchase = require("../models/Purchase");
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
const BASE_URL_CART = '/api/v1/cart';

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

afterAll(async () => {
  await Category.destroy({ where: { id: categoryId } });
  await Product.destroy({ where: { id: productId } });
  // await Purchase.destroy({ where: { id: purchaseId } });
});

test("Create Post --> '/purchase' should return 201", async()=>{
  const res = await supertest(app).post(BASE_URL).send().set('Authorization', `Bearer ${TOKEN}`);

  expect(res.status).toBe(201);
  // console.log(res.body);
});

test("GetAll Get --> '/purchase' should return 200", async()=>{
  const res = await supertest(app).get(BASE_URL).set('Authorization', `Bearer ${TOKEN}`);
  purchaseId = res.body.id

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.id).toBe(purchaseId);
  expect(res.body[0].productId).toBe(productId);
  expect(res.body[0].product.categoryId).toBe(categoryId);
  expect(res.body[0].product.category.id).toBe(categoryId);
  // console.log(res.body[0]);
});

test("Cart Empy --> '/cart' should empy array, status code 200", async()=>{
  const res = await supertest(app).get(BASE_URL_CART).set('Authorization', `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(0);
  expect(res.body).toEqual([]);
})