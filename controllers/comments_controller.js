const CommentModel = require('../models/comment');
const PostModel = require("../models/posts_model");

const createComment = async (req, res) => {
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
      res.status(400).send(error.message);
    }
  };
  

