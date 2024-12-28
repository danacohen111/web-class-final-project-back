import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import usersModel from "../models/users_model";
import { Express } from "express";

let app: Express;

type UserInfo = {
  username: string;
  email: string;
  password: string;
  token?: string;
  _id?: string;
};

const userInfo: UserInfo = {
  username: "Ilana",
  email: "ilana@gmail.com",
  password: "123456"
};

beforeAll(async () => {
  app = await initApp();
  await commentsModel.deleteMany();
  await usersModel.deleteMany();
  await request(app).post("/auth/register").send(userInfo);
  const response = await request(app).post("/auth/login").send(userInfo);
  userInfo.token = response.body.token;
  userInfo._id = response.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

let commentId:string = "";

const testComment1 = {
  sender: "Ilana Belokon",
  content: "My post",
  post: "6744dc0e9ce738f0e3525357"};

const updatedComment = {
    sender: "Ilana",
    content: "Updated post",
    post: "6744dc0e9ce738f0e3525357"
  };

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
    const response = await request(app).patch(`/comments/${commentId}`).send(updatedComment);
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

    test("Comment Delete test", async () => {
        const response = await request(app).delete(`/comments/${commentId}`);
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
        const response = await request(app).get(`/comments/${commentId}`);
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
      
      test("Comment Get by ID - Not found", async () => {
        const response = await request(app).get(`/comments/${commentId}`);
        console.log(response.body);
        expect(response.statusCode).toBe(404);
      });




});