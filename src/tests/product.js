const supertest = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
require('../models')

let TOKEN
let productID
let product
let categoryId

const BASE_URL = '/api/v1/products';
const BASE_URL_LOGIN = '/api/v1/users/login'

beforeAll(async()=>{
  const user = {
    email: "leo@mail.com",
    password: "leo12345"
  };
  const res = await supertest(app).post(`${BASE_URL_LOGIN}`).send(user);
  TOKEN = res.body.token
  // console.log(TOKEN)

  const category = await Category.create({name: "ropa jean"})
  categoryId = category.id

  product = {
    title: "Adidas X8",
    description: "Lorem ipsun adidas shoes",
    price: 24.99,
    categoryId: category.id
  };

});

afterAll(async () => {
  await Category.destroy({ where: { id: categoryId } });
});

test("Create Post --> '/products' should return status code 201", async()=>{
  const res = await supertest(app).post(BASE_URL).send(product).set('Authorization', `Bearer ${TOKEN}`);
  console.log(res);
  productID = res.body.id

  expect(res.status).toBe(201);
});

test("GetAll --> '/products' should return status code 200", async()=>{
  const res = await supertest(app).get(BASE_URL)
  // console.log(res);

  expect(res.status).toBe(200);
  expect(res.body[0].id).toBe(productID)
});

test("GetOne Get -->'/products/id' should return status code 200", async()=>{
  const res = await supertest(app).get(`${BASE_URL}/${productID}`)
  // console.log(res)

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});

test("Put -->'/products/id' should return status code 200", async()=>{
  const productUpdate = {
      title: "Adidas X10",
  }

  const res = await supertest(app).put(`${BASE_URL}/${productID}`).send(productUpdate).set('Authorization', `Bearer ${TOKEN}`)
  // console.log(res.body)
  
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(productUpdate.title);
});


test("Delete Delete -->'/products/id' should return status code 204", async()=>{
  const res = await supertest(app).delete(`${BASE_URL}/${productID}`).set('Authorization', `Bearer ${TOKEN}`)
  // console.log(res)
  
  expect(res.status).toBe(204);
});