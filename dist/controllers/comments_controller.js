"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_model_1 = __importDefault(require("../models/comments_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
class CommentsController extends base_controller_1.default {
    constructor() {
        super(comments_model_1.default);
    }
    getAllCommentsForPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.post;
            if (!postId) {
                return res.status(400).send('Post ID is required');
            }
            try {
                const comments = yield comments_model_1.default.find({ post: postId });
                if (comments.length === 0) {
                    return res.status(404).send("No comments found for this post.");
                }
                res.send(comments);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    ;
}
exports.default = new CommentsController();
//# sourceMappingURL=comments_controller.js.map