import { Request, Response } from 'express';
import BaseController from './base_controller';
import PostModel, { IPost } from '../models/posts_model';

const postsController = new BaseController<IPost>(PostModel);

const createPost = async (req: Request, res: Response) => {
    const postBody = req.body;
    try {
      const post = await PostModel.create(postBody);
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send(error);
    }
};

const getPostsBySender = async (senderId: string, res: Response) => {
  try {
    const posts = await PostModel.find({ senderID: senderId });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPostById = async (req: Request, res: Response) => {

  const postId = req.params.id;
  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPosts = async (req: Request, res: Response) => {

  const senderId:any = req.query.sender;

  if (senderId) {
    return getPostsBySender(senderId, res);
  }
  try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {

  const { postId } = req.params;
  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).send("At least one of title or content is required");
  }

  try {
    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default postsController