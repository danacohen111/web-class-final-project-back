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
const base_controller_1 = __importDefault(require("./base_controller"));
const posts_model_1 = __importDefault(require("../models/posts_model"));
class PostsController extends base_controller_1.default {
    constructor() {
        super(posts_model_1.default);
    }
    getPostsBySender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderId = req.params.senderId;
            try {
                const posts = yield posts_model_1.default.find({ senderID: senderId });
                res.status(200).send(posts);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
}
exports.default = new PostsController();
//# sourceMappingURL=posts_controller.js.map