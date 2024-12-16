"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controller_1 = __importDefault(require("../controllers/comments_controller"));
const router = express_1.default.Router();
router.get("/", comments_controller_1.default.getAll.bind(comments_controller_1.default));
//Change route to fit the api
//router.get("/post", commentsController.getAllCommentsForPost.bind(commentsController));
router.get("/:id", comments_controller_1.default.getById.bind(comments_controller_1.default));
router.post("/", comments_controller_1.default.create.bind(comments_controller_1.default));
router.delete("/:id", comments_controller_1.default.deleteItem.bind(comments_controller_1.default));
exports.default = router;
//# sourceMappingURL=comments_route.js.map