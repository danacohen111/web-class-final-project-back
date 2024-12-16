import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;
const connectionString = process.env.DB_CONNECT;

if (connectionString) {
  mongoose.connect(connectionString);
} else {
  console.error("Database connection string is not defined");
}
const db = mongoose.connection;
db.on("error", (error: unknown) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRoute = require("./routes/posts_route");
const commentsRoute = require("./routes/comments_route");
app.use("/post", postsRoute);
app.use('/commentS', commentsRoute);  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
