const supertest = require("supertest");
const app = require("../app");
// const User = require("../models/User");
// const sequelize = require("../utils/connection");

let TOKEN
beforeAll(async()=>{
  const user = {
    email: "leo@mail.com",
    password: "leo12345"
  }
  const res = await supertest(app).post(`${BASE_URL}/login`).send(user);
  TOKEN = res.body.token
  console.log(TOKEN)
});

const BASE_URL = "/api/v1/users"
const user = {
  firstName: "Ronaldo",
  lastName: "Ron",
  email: "ronaldo@mail.com",
  password: "ronaldo12345",
  phone: "+59362454547"
}


test("Create Post --> Users, should return status code 201", async () => {
  const res = await supertest(app).post(BASE_URL).send(user);

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
})