import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
// import commentsModel from "../models/posts_model";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
  console.log("init app");
  app = await initApp();
  console.log("init app finished");
  // await commentsModel.deleteMany();
  console.log("delete all posts");
});

afterAll(async () => {
  await mongoose.connection.close();
});

let commentId:string = "";

const testComment1 = {
  sender: "Ilana",
  content: "My post",
  post: new mongoose.Types.ObjectId().toString()};

describe("Comments Tests", () => {
  test("Comments Get All comments", async () => {
    const response = await request(app).get("/comments");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test("Comment Create test", async () => {
    const response = await request(app).post("/comments").send(testComment1);
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

});