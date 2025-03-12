import initApp from "../server";
import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";
import path from "path";

let app: Express;

beforeAll(async () => {
    process.env.BASE_URL = "http://localhost:3000";
    app = await initApp();
    console.log("beforeAll");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("File Tests", () => {
    test("upload file", async () => {
        const filePath = path.join(__dirname, 'capten.webp');

        try {
            const response = await request(app)
                .post("/file")
                .attach('file', filePath);
            console.log('Upload response:', response.body);
            expect(response.statusCode).toEqual(200);
            let url = response.body.url;
            url = url.replace(/^.*\/\/[^/]+/, '');
            const res = await request(app).get(url);
            console.log('Get file response:', res.body);
            expect(res.statusCode).toEqual(200);
        } catch (err) {
            console.error('Error during file upload test:', err);
            throw err;
        }
    });
});