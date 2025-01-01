import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import { Express } from "express";
import usersModel from "../models/users_model";

let app: Express;

type UserInfo = {
  username: string;
  email: string;
  password: string;
  token?: string;
  _id?: string;
};

const userInfo: UserInfo = {
  username: "ilana",
  email: "ilana2",
  password: "ilana2"
}

const userTest = {
    username: "ilana",
    email: "ilana2",
    password: "ilana2"
}

const updatedUserInfo = {
    username: "ilana_updated",
    email: "ilana2_updated",
    password: "ilana2_updated"
  };

const testUserFail = {
    email: "ilana1",
};
  
  let userId = "";

beforeAll(async () => {
  app = await initApp();
  await usersModel.deleteMany();
  await request(app).post("/auth/register").send(userInfo);
  const response = await request(app).post("/auth/login").send({
    email: userInfo.email,
    password: userInfo.password
  });
  userInfo.token = response.body.accessToken;
  userInfo._id = response.body._id;
  console.log("user: " + userInfo.token);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Users Tests", () => {
    test("Users Get All test", async () => {
        const response = await request(app)
          .get("/users")
          .set("authorization", "JWT " + userInfo.token);
        const users = response.body;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(users)).toBe(true);
      });

  test("Users Create test", async () => {
        const response = await request(app)
          .post("/users")
          .send(userTest);
        const user = response.body;
        expect(response.statusCode).toBe(201);
        expect(user.username).toBe(userTest.username);
        expect(user.email).toBe(userTest.email);
        userId = user._id;
      });

  test("Users Get By Id test", async () => {
    const response = await request(app)
      .get("/users/" + userId)
      .set("authorization", "JWT " + userInfo.token);
    const user = response.body;
    expect(response.statusCode).toBe(200);
    expect(user._id).toBe(userId);
    expect(user.username).toBe(userInfo.username);
    expect(user.email).toBe(userInfo.email);
  });

  test("Users Get By Id test fail", async () => {
    const response = await request(app).get("/users/" + userId + "3");
    const user = response.body;
    expect(response.statusCode).toBe(400);
  });

  test("Users Create test", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(userInfo);
    const user = response.body;
    expect(response.statusCode).toBe(201);
    expect(user.username).toBe(userInfo.username);
    expect(user.email).toBe(userInfo.email);
    userId = user._id;
  });

  test("Users Create test fail", async () => {
    const response = await request(app).post("/users").send(testUserFail);
    expect(response.statusCode).not.toBe(201);
  });

  test("Users Update test", async () => {
    const response = await request(app)
      .put("/users/" + userId)
      .set("authorization", "JWT " + userInfo.token)
      .send(updatedUserInfo);
    const user = response.body;
    expect(response.statusCode).toBe(200);
    expect(user._id).toBe(userId);
    expect(user.username).toBe(updatedUserInfo.username);
    expect(user.email).toBe(updatedUserInfo.email);
  });

  test("Users Delete test", async () => {
    const response = await request(app)
      .delete("/users/" + userId)
      .set("authorization", "JWT " + userInfo.token);
    expect(response.statusCode).toBe(200);

    const response2 = await request(app)
      .get("/users/" + userId)
      .set("authorization", "JWT " + userInfo.token);
    expect(response2.statusCode).toBe(404);
  });
});