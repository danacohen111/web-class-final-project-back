import express from "express";
import usersController from "../controllers/users_controller";

const router = express.Router();

router.post("/", usersController.create.bind(usersController));

router.put("/:userId", usersController.update.bind(usersController));

router.get("/:userId", usersController.getById.bind(usersController));

router.get("/", usersController.getAll.bind(usersController));

router.delete("/", usersController.deleteItem.bind(usersController));

export default router;