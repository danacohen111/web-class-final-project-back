import CommentModel, {IComment} from '../models/comments_model';
import { Request, Response } from 'express';
import BaseController from './base_controller';

class CommentsController extends BaseController<IComment> {
  constructor() {
      super(CommentModel);
  }

}

export default new CommentsController();

