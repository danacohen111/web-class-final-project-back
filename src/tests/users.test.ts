import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import { Express } from "express";
import userModel from "../models/users_model";
import postsModel from "../models/posts_model";

let app: Express;

type UserInfo = {
  username: string;
  email: string;
  password: string;
  token?: string;
  _id?: string;
};

const userTest: UserInfo = {
    username: "ilana1",
    email: "ilana1",
    password: "ilana1"
}

const updatedUserInfo: UserInfo = {
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
  await postsModel.deleteMany();
  await userModel.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Users Tests", () => {
    test("Users Get All test", async () => {
        const response = await request(app).get("/users");
        const users = response.body;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(users)).toBe(true);
      });

    test("Users Create test", async () => {
        const response = await request(app).post("/users").send(userTest);
        const user = response.body;
        expect(response.statusCode).toBe(201);
        expect(user.username).toBe(userTest.username);
        expect(user.email).toBe(userTest.email);
        expect(user.password).toBe(userTest.password);
        userId = user._id;

        await request(app).post("/auth/register").send(userTest);
        const response1 = await request(app).post("/auth/login").send({
          email: userTest.email,
          password: userTest.password
        });
        userTest.token = response1.body.accessToken;
        userTest._id = response1.body._id;
        console.log("userme: " + userTest.token);
    });

    test("Users Create double test fail", async () => {
        const response = await request(app).post("/users").send(userTest);
        expect(response.statusCode).toBe(400);
    });

    test("Users Create with missing info test fail", async () => {
      const response = await request(app).post("/users").send(testUserFail);
      expect(response.statusCode).toBe(400);
  });

  test("Users Get By Id test", async () => {
    const response = await request(app).get("/users/" + userId)
    const user = response.body;
    expect(response.statusCode).toBe(200);
    expect(user._id).toBe(userId);
    expect(user.username).toBe(userTest.username);
    expect(user.email).toBe(userTest.email);
  });

  test("Users Get By Id test fail", async () => {
    const response = await request(app).get("/users/" + userId + "3");
    const user = response.body;
    expect(response.statusCode).toBe(400);
  });

  test("Users Update test", async () => {
    const response = await request(app).put("/users/" + userId)
    .set("authorization", "JWT " + userTest.token)
    .send(updatedUserInfo);
    const user = response.body;
    expect(response.statusCode).toBe(200);
    expect(user._id).toBe(userId);
    expect(user.username).toBe(updatedUserInfo.username);
    expect(user.email).toBe(updatedUserInfo.email);
  });

  test("Users Delete test", async () => {
    const response = await request(app).delete("/users/" + userId)
    .set("authorization", "JWT " + userTest.token);
    expect(response.statusCode).toBe(200);

    const response2 = await request(app).get("/users/" + userId);
    expect(response2.statusCode).toBe(404);
  });
});