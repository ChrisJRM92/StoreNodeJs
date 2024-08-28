const supertest = require("supertest");
const app = require("../app");

let categoryId;
let TOKEN;

const BASE_URL = '/api/v1/categories';
const BASE_URL_LOGIN = '/api/v1/users';

const category = {
  name: "tshirts"
};

beforeAll(async()=>{
  const user = {
    email: "leo@mail.com",
    password: "leo12345"
  }
  const res = await supertest(app).post(`${BASE_URL_LOGIN}/login`).send(user);
  TOKEN = res.body.token
  // console.log(TOKEN)
});

test("Create Post Private --> '/categories' should return status code 201", async()=>{
  const res = await supertest(app).post(BASE_URL).send(category).set('Authorization', `Bearer ${TOKEN}`);

  categoryId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(category.name);
});

test("GEtAll Public --> '/categories' should return status code 200", async()=>{
  const res = await supertest(app).get(BASE_URL);
  
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});

test("Delete Private --> '/categories' should return status code 200", async()=>{
  const res = await supertest(app).delete(`${BASE_URL}/${categoryId}`).set('Authorization', `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
})

