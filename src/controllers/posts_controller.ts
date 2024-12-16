import { Request, Response } from 'express';
import BaseController from './base_controller';
import PostModel, { IPost } from '../models/posts_model';

class PostsController extends BaseController<IPost> {
    constructor() {
        super(PostModel);
    }
    
    async getPostsBySender(req: Request, res: Response) {
        const senderId = req.params.senderId;
        try {
            const posts = await PostModel.find({ senderID: senderId });
            res.status(200).send(posts);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default new PostsController();