import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import realestateModel from "../models/realestate_model";
import { Express } from "express";
import userModel, { IUser } from "../models/users_model";

let app: Express;

type UserInfo = {
  username: string;
  email: string;
  password: string;
  token?: string;
  _id?: string;
};

const userInfo: UserInfo = {
  username: "testuser",
  email: "test@user.com",
  password: "testpassword"
};

const testRealestate = {
  city: "TLV",
  address: "Shaul Hamelech 1",
  owner: "tbd",
  description: "Beautiful apartment",
  area: "400x400",
  location: "37.7749,-122.4194"
};

const updatedRealestate = {
  address: "Leonardo da vinchi 1"
};

beforeAll(async () => {
  app = await initApp();
  await realestateModel.deleteMany();
  await userModel.deleteMany();
  await request(app).post("/auth/register").send(userInfo);
  const response = await request(app).post("/auth/login").send({
    email: userInfo.email,
    password: userInfo.password
  });
  userInfo.token = response.body.accessToken;
  userInfo._id = response.body._id;
  testRealestate.owner = userInfo._id as string;
});

afterAll(async () => {
  await mongoose.connection.close();
});

var realestateId = "";

describe("Realestate Tests", () => {
  test("Create Realestate", async () => {
    const response = await request(app).post("/realestate")
      .set("authorization", "JWT " + userInfo.token)
      .send(testRealestate);
    const realestate = response.body;
    expect(response.statusCode).toBe(201);
    expect(realestate.city).toBe(testRealestate.city);
    expect(realestate.address).toBe(testRealestate.address);
    expect(realestate.description).toBe(testRealestate.description);
    realestateId = realestate._id;
  });

  test("Get All Realestate", async () => {
    const response = await request(app).get("/realestate");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Get Realestate By ID", async () => {
    const response = await request(app).get("/realestate/" + realestateId);
    const realestate = response.body;
    expect(response.statusCode).toBe(200);
    expect(realestate._id).toBe(realestateId);
  });

  test("Get Realestate By Owner ID", async () => {
    const response = await request(app).get("/realestate?owner=" + userInfo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Update Realestate", async () => {
    const response = await request(app).put("/realestate/" + realestateId)
      .set("authorization", "JWT " + userInfo.token)
      .send(updatedRealestate);
    const realestate = response.body;
    expect(response.statusCode).toBe(200);
    expect(realestate.address).toBe(updatedRealestate.address);
  });

  test("Delete Realestate", async () => {
    const response = await request(app).delete("/realestate/" + realestateId)
      .set("authorization", "JWT " + userInfo.token);
    expect(response.statusCode).toBe(200);

    const response2 = await request(app).get("/realestate/" + realestateId);
    expect(response2.statusCode).toBe(404);
  });
});