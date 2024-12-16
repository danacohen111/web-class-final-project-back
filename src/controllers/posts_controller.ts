import { Request, Response } from 'express';
import BaseController from './base_controller';
import PostModel, { IPost } from '../models/posts_model';

class PostsController extends BaseController<IPost> {
    constructor() {
        super(PostModel);
    }
}

export default new PostsController();