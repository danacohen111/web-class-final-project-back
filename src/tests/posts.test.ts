import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postsModel from "../models/posts_model";
import { Express } from "express";
import userModel from "../models/users_model";

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


beforeAll(async () => {
  app = await initApp();
  await postsModel.deleteMany();
  await userModel.deleteMany();
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

var postId = "";

const testPost1 = {
  user: "67b5f62d7a9f30ccb1fca1aa",
  title: "My First post",
  content: "This is my first post",
  realestate: "67b5f62d7a9f30ccb1fca1aa"
};

const testPost2 = {
  user: "67b5f62d7a9f30ccb1fca1bb",
  title: "My First post 2",
  content: "This is my first post 2",
  realestate: "67b5f62d7a9f30ccb1fca1aa"
};

const testPostFail = {
  content: "This is my first post 2",
  user: "ilanatest",
};

const updatedPost = {
    title: "My updated post",
    user: "67b5f62d7a9f30ccb1fca1aa",
    content: "My first update",
    realestate: "67b5f62d7a9f30ccb1fca1aa"
  };
  

describe("Posts Tests", () => {
  test("Posts Get All test", async () => {
    const response = await request(app).get("/posts");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test("Posts Create test", async () => {
    console.log(userInfo.token)
    const response = await request(app).post("/posts")
      .set("authorization", "JWT " + userInfo.token)
      .send(testPost1);
    const post = response.body;
    expect(response.statusCode).toBe(201);
    expect(post.user).toBe(testPost1.user);
    expect(post.title).toBe(testPost1.title);
    expect(post.content).toBe(testPost1.content);
    postId = post._id;
  });

  test("Posts Get By Id test", async () => {
    const response = await request(app).get("/posts/" + postId);
    const post = response.body;
    console.log("/posts/" + postId);
    console.log(post);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(post._id);
  });

  test("Posts Get By Id test fail", async () => {
    const response = await request(app).get("/posts/" + postId + "3");
    const post = response.body;
    expect(response.statusCode).toBe(400);
  });

  test("Posts Create test", async () => {
    const response = await request(app).post("/posts")
      .set("authorization", "JWT " + userInfo.token)
      .send(testPost2);
    console.log(response.body);
    const post = response.body;
    expect(response.statusCode).toBe(201);
    expect(post.title).toBe(testPost2.title);
    expect(post.content).toBe(testPost2.content);
    postId = post._id;
  });

  test("Posts Create test fail", async () => {
    const response = await request(app).post("/posts").send(testPostFail);
    expect(response.statusCode).not.toBe(201);
  });

  test("Posts Update test", async () => {
    const response = await request(app)
      .put("/posts/" + postId)
      .set("authorization", "JWT " + userInfo.token)
      .send(updatedPost);
    const post = response.body;
    expect(response.statusCode).toBe(200);
    expect(post._id).toBe(postId);
    expect(post.user).toBe(updatedPost.user);
    expect(post.title).toBe(updatedPost.title);
    expect(post.content).toBe(updatedPost.content);
  });

  test("Posts get posts by user", async () => {
    const response = await request(app).get("/posts?user=" + testPost1.user);
    const post = response.body[0];
    expect(response.statusCode).toBe(200);
    expect(post.user).toBe(testPost1.user);
    expect(response.body.length).toBe(2);
  });

  test("Posts Delete test", async () => {
    const response = await request(app).delete("/posts/" + postId)
      .set("authorization", "JWT " + userInfo.token);
    expect(response.statusCode).toBe(200);

    const response2 = await request(app).get("/posts/" + postId);
    expect(response2.statusCode).toBe(404);
  });
});