import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postsModel from "../models/posts_model";
import commentsModel from "../models/comments_model";
import usersModel from "../models/users_model";
import { Express } from "express";
import realestateModel from "../models/realestate_model";

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
  
  const testPost1 = {
    sender: "Ilana",
    title: "My First post",
    content: "This is my first post",
    realestate: "60f9f8b7b3c3e1b9d8"
  };
  
  const testComment1 = {
    sender: "Ilana",
    content: "My post",
    post: new mongoose.Types.ObjectId().toString()
  };

  const updatedComment = {
    sender: "Ilana",
    content: "I like this post",
    post: new mongoose.Types.ObjectId().toString()
  };
  
  let postId = "";
  let commentId = "";
  
  beforeAll(async () => {
    app = await initApp();
    await postsModel.deleteMany();
    await usersModel.deleteMany();
    await commentsModel.deleteMany();
    await request(app).post("/auth/register").send(userInfo);
    const loginResponse = await request(app).post("/auth/login").send({
      email: userInfo.email,
      password: userInfo.password
    });
    userInfo.token = loginResponse.body.accessToken;
    userInfo._id = loginResponse.body._id;
    const postResponse = await request(app).post("/posts")
    .set("authorization", "JWT " + userInfo.token)
    .send(testPost1);
    const post = postResponse.body;
    postId = post._id;
    testComment1.post = postId;
    updatedComment.post = postId;
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

describe("Comments Tests", () => {
  test("Comment Get All comments", async () => {
    const response = await request(app).get("/comments");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test("Comment Create test", async () => {
    const response = await request(app)
    .post("/comments")
    .set("authorization", "JWT " + userInfo.token)
    .send(testComment1);
    console.log(response.body);
    if (response.statusCode !== 201) {
        console.error("Error:", response.body);
      }
    const comment = response.body;
    expect(response.statusCode).toBe(201);
    expect(comment.sender).toBe(testComment1.sender);
    expect(comment.content).toBe(testComment1.content);
    expect(comment.post).toBe(testComment1.post);
    commentId = comment._id;
  });

  test("Comment Update test", async () => {
    const response = await request(app)
    .put(`/comments/${commentId}`)
    .set("authorization", "JWT " + userInfo.token)
    .send(updatedComment);
    console.log(response.body);
    if (response.statusCode !== 200) {
      console.error("Error:", response.body);
    }
    const comment = response.body;
    expect(response.statusCode).toBe(200);
    expect(comment.sender).toBe(updatedComment.sender);
    expect(comment.content).toBe(updatedComment.content);
    expect(comment.post).toBe(updatedComment.post);
  });

  test("Comment Get by ID", async () => {
    const response = await request(app)
    .get(`/comments/${commentId}`);
    console.log(response.body);
    if (response.statusCode !== 200) {
      console.error("Error:", response.body);
    }
    const comment = response.body;
    expect(response.statusCode).toBe(200);
    expect(comment._id).toBe(commentId);
    expect(comment.sender).toBe(updatedComment.sender);
    expect(comment.content).toBe(updatedComment.content);
    expect(comment.post).toBe(updatedComment.post);
  });

    test("Comment Delete test", async () => {
        const response = await request(app)
        .delete(`/comments/${commentId}`)
        .set("authorization", "JWT " + userInfo.token);
        console.log(response.body);
        if (response.statusCode !== 200) {
        console.error("Error:", response.body);
        }
        const comment = response.body;
        expect(response.statusCode).toBe(200);
        expect(comment.sender).toBe(updatedComment.sender);
        expect(comment.content).toBe(updatedComment.content);
        expect(comment.post).toBe(updatedComment.post);
    });
      
      test("Comment Get by ID - Not found", async () => {
        const response = await request(app).get(`/comments/${commentId}`);
        console.log(response.body);
        expect(response.statusCode).toBe(404);
      });
});