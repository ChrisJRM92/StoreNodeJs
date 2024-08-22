const supertest = require("supertest");
const app = require("../app");
// const User = require("../models/User");
// const sequelize = require("../utils/connection");

let TOKEN
// let TOKEN2
let userId
const BASE_URL = "/api/v1/users"

beforeAll(async()=>{
  const user = {
    email: "leo@mail.com",
    password: "leo12345"
  }
  const res = await supertest(app).post(`${BASE_URL}/login`).send(user);
  TOKEN = res.body.token
  // console.log(TOKEN)
});

const user = {
  firstName: "Ronaldo",
  lastName: "Ron",
  email: "ronaldo@mail.com",
  password: "ronaldo12345",
  phone: "+59362454547"
}

test("Create Post --> Users, should return status code 201", async () => {
  const res = await supertest(app).post(BASE_URL).send(user);
  userId = res.body.id
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
});

test("Get --> BASE_URL should return status code 200 and res.body.length == 2", async()=>{
  const res = await supertest(app).get(BASE_URL).set('authorization', `Bearer ${TOKEN}`);
  // console.log(res)
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(2);
});

test("PUT -> 'BASE_URL/:ID', should return statusCode 200, and res.body.firstName === userUpdate.firstName", async () => {

  const userUpdate = {
    firstName: "Jose"
  }
  const res = await supertest(app).put(`${BASE_URL}/${userId}`).send(userUpdate).set('Authorization', `Bearer ${TOKEN}`)
  // console.log(res)
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(userUpdate.firstName)
})

test("Post login --> BASE_URL/login should return 200", async()=>{
  const hits = {
    email: "ronaldo@mail.com",
    password: "ronaldo12345"
  }
  const res = await supertest(app).post(`${BASE_URL}/login`).send(hits);
  // TOKEN2 = res.body.token
  // console.log(res)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.token).toBeDefined()
  expect(res.body.user.email).toBe(hits.email)

});

test("Post login --> BASE_URL/login should return 200", async()=>{
  const hits = {
    email: "ronaldo@mail.com",
    password: "invalidPassword"
  }
  const res = await supertest(app).post(`${BASE_URL}/login`).send(hits);
  // TOKEN2 = res.body.token
  // console.log(res)
  expect(res.status).toBe(401)
});

test("DELETE -> 'BASE_URL/:ID', should return statusCode 204", async () => {
  const res = await supertest(app).delete(`${BASE_URL}/${userId}`).set('Authorization', `Bearer ${TOKEN}`)
  expect(res.statusCode).toBe(204)
})



