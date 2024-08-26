const supertest = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const Product = require("../models/Product");
require('../models');

const BASE_URL = '/api/v1/cart';
const BASE_URL_LOGIN = '/api/v1/users/login';

let TOKEN;
let categoryId;
let productId;
let product;
let cartId;

beforeAll(async()=>{
  const user = {
    email: "leo@mail.com",
    password: "leo12345"
  };

  const res = await supertest(app).post(BASE_URL_LOGIN).send(user);
  TOKEN = res.body.token;

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
  // console.log(productCreate)
})


test("Create Post --> '/cart' should return 201",async()=>{
  const createData = {
    productId: productId,
    quantity: 3
  }

  const res = await supertest(app).post(BASE_URL).send(createData).set('Authorization', `Bearer ${TOKEN}`);
  cartId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(createData.quantity);
  // console.log(res)
});

test("GetAll Get --> '/cart' should return 200",async()=>{
  const res = await supertest(app).get(BASE_URL).set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  // console.log(res)
});

test("GetOne Get --> '/cart/:id' should return 200",async()=>{
  const res = await supertest(app).get(`${BASE_URL}/${cartId}`).set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  // console.log(res)
});

test("Update Put --> '/cart/:id' should return 200", async()=>{
  const updateData = {
    quantity: 6
  };

  const res = await supertest(app).put(`${BASE_URL}/${cartId}`).send(updateData).set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(updateData.quantity);
  console.log(res.body)
});

test("Delete delete --> '/cart/:id' should return 204", async()=>{
  const res = await supertest(app).delete(`${BASE_URL}/${cartId}`).set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(204);
});