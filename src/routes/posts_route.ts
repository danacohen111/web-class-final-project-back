import express from "express";
import postsController from "../controllers/posts_controller";

const router = express.Router();

//router.put("/:postId", postsController.getPostsBySender.bind(postsController));

router.get("/", postsController.getAll.bind(postsController));

router.get("/:id", postsController.getById.bind(postsController));

router.post("/", postsController.create.bind(postsController));

router.delete("/:id", postsController.deleteItem.bind(postsController));

export default router;
