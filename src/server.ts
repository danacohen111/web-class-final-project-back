import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express, { Express } from "express";
import cors from "cors"; 
import postsRoute from "./routes/posts_route";
import commentsRoute from "./routes/comments_route";
import usersRoute from "./routes/users_route";
import auth_routes from "./routes/auth_route";
import realestateRoute from "./routes/realestate_route";
import fileRoute from "./routes/file_route";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, 
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/users", usersRoute);
app.use("/auth", auth_routes);
app.use('/realestate',realestateRoute);
app.use("/file", fileRoute);
app.use("/public", express.static("public"));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "1.0.0",
      description: "REST server including authentication using JWT",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const initApp = () => {
  return new Promise<Express>((resolve, reject) => {
    if (!process.env.DB_CONNECT) {
      reject("DB_CONNECT is not defined in environment variables");
    } else {
      mongoose
        .connect(process.env.DB_CONNECT, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as mongoose.ConnectOptions)
        .then(() => {
          resolve(app);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

export default initApp;