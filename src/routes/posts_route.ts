import express from "express";
import postsController from "../controllers/posts_controller";

const router = express.Router();

router.post("/", postsController.createPost.bind(postsController));

router.get("/:id", postsController.getPostById.bind(postsController));

router.get("/", postsController.getAllPosts.bind(postsController));

router.put("/:postId", postsController.updatePost.bind(postsController));

export default router;
