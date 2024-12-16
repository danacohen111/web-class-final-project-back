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
  owner: "Ilana",
  comment: "My post",
  postId: "1",
};

const testComment2 = {
  owner: "Ilana2",
  comment: "My post 2",
  postId: "2",
};

const testCommentFail = {
  comment: "My post 2",
  postId: "2",
};

describe("Comments Tests", () => {
  test("Comments Get All coimments", async () => {
    const response = await request(app).get("/comments");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test("Comment Create test", async () => {
    const response = await request(app).post("/comments").send(testComment1);
    console.log(response.body);
    const comment = response.body;
    expect(response.statusCode).toBe(201);
    expect(comment.owner).toBe(testComment1.owner);
    expect(comment.comment).toBe(testComment1.comment);
    expect(comment.postId).toBe(testComment1.postId);
    commentId = comment._id;
  });

});