import express from "express";
import commentsController from '../controllers/comments_controller';

const router = express.Router();

router.get("/", commentsController.getAll.bind(commentsController));

//Change route to fit the api
//router.get("/", commentsController.getAllCommentsForPost.bind(commentsController));

router.get("/:id", commentsController.getById.bind(commentsController));

router.post("/", commentsController.create.bind(commentsController));

router.delete("/:id", commentsController.deleteItem.bind(commentsController));

export default router;
