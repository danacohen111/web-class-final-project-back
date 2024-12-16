import express from "express";
import usersController from "../controllers/users_controller";

const router = express.Router();

router.post("/", usersController.create.bind(usersController));

router.put("/:id", usersController.updateItem.bind(usersController));

router.get("/:id", usersController.getById.bind(usersController));

router.get("/", usersController.getAll.bind(usersController));

router.delete("/:id", usersController.deleteItem.bind(usersController));

export default router;