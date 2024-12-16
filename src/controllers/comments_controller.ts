import CommentModel, {IComment} from '../models/comments_model';
import { Request, Response } from 'express';
import BaseController from './base_controller';

class CommentsController extends BaseController<IComment> {
  constructor() {
      super(CommentModel);
  }

  async getAllCommentsForPost(req: Request, res: Response) {
  
    const postId = req.query.postId;
      if (!postId) {
            return res.status(400).send('Post ID is required');
        }
      
        try {
          const comments = await CommentModel.find({ post: postId });
      
          if (comments.length === 0) {
            return res.status(404).send("No comments found for this post.");
          }
      
          res.send(comments);
        } catch (error) {
          res.status(400).send(error);
        }
    };
}

export default new CommentsController();

