import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
// import commentsModel from "../models/posts_model";
import { Express } from "express";

let app: Express;
const token = "4eee4852695b0e1722b0bd9ba6c87758205a2e98b1e46b08610706d63873c6016f2bd9f3e5a0c0cf5bbefd2cecad58b95185319d57e8fd7efd2c142333e09772";

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

const updatedComment = {
    sender: "Ilana",
    content: "Updated post",
    post: new mongoose.Types.ObjectId().toString()
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
    .set("authorization", "JWT" + token)
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

    test("Comment Get All comments", async () => {
        const response = await request(app).get("/comments");
        console.log(response.body);
        expect(response.statusCode).toBe(200);
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