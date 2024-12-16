import CommentModel, {IComment} from '../models/comments_model';
import PostModel from "../models/posts_model";
import { Request, Response } from 'express';
import BaseController from './base_controller';

const commentsController = new BaseController<IComment>(CommentModel);

const createComment = async (req: Request, res: Response) => {
    const { postId, sender, content } = req.body;
  
    try {
      const post = await PostModel.findById(postId);
      if (!post) {
        return res.status(404).send("Post not found");
      }
  
      const comment = await CommentModel.create({
        post: postId,
        sender,
        content,
      });
  
      res.status(201).send(comment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      } else {
        res.status(400).send("An unknown error occurred");
      }
    }
};
  
const updateComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    try {
      const comment = await CommentModel.findById(commentId);

      if (!comment) {
        return res.status(404).send("Comment not found");
      }

      comment.content = content;
      await comment.save();

      res.json(comment);
    } catch (error) {
      res.status(400).send(error);
    }
};
  
const deleteComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
  
    try {
      const comment = await CommentModel.findById(commentId);
  
      if (!comment) {
        return res.status(404).send("Comment not found");
      }
  
      await comment.deleteOne();
  
      res.send("Comment deleted successfully");
    } catch (error) {
      res.status(400).send(error);
    }
  };

const getAllCommentsForPost = async (req: Request, res: Response) => {
  
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

const getCommentById = async (req: Request, res: Response) => {

    const { id } = req.params;

    if (!id) {
      return res.status(400).send('Comment ID is required');
    }
  
    try {
      const comment = await CommentModel.findById(id);
  
      if (!comment) {
        return res.status(404).send('Comment not found');
      }
  
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).send(error);
    }
};

const getAllComments = async (req: Request, res: Response) => {

    try {
        const comments = await CommentModel.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).send(error);
    }
};
const getComments = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { postId } = req.query;

    if (id) {
        return getCommentById(req, res);
    }

    if (postId) {
        return getAllCommentsForPost(req, res);
    }

    return getAllComments(req, res);
};
  
  export default commentsController