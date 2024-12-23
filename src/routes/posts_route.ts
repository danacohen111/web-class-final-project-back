import express from "express";
import postsController from "../controllers/posts_controller";
import { authMiddleware } from "../controllers/auth_controller";

const router = express.Router();

/**
* @swagger
* tags:
*   name: Posts
*   description: The Posts API
*/
/**
* @swagger
* /posts:
*   get:
*     summary: Get all posts
*     description: Retrieve all posts
*     tags: [Posts]
*     responses:
*       200:
*         description: Posts retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   title:
*                     type: string
*                   content:
*                     type: string
*                   sender:
*                     type: string
*                   _id:
*                     type: string
*       500:
*         description: Internal server error
*/

router.get("/", postsController.getAll.bind(postsController));

router.get("/:id", postsController.getById.bind(postsController));

router.post("/", authMiddleware, postsController.create.bind(postsController));

router.put("/:id", authMiddleware, postsController.updateItem.bind(postsController));

router.delete("/:id", authMiddleware, postsController.deleteItem.bind(postsController));

export default router;
