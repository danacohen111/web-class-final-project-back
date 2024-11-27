const PostModel = require("../models/posts_model");

const createPost = async (req, res) => {
    const postBody = req.body;
    try {
      const post = await PostModel.create(postBody);
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

const getAllPosts = async (req, res) => {
  try {
      const posts = await PostModel.find();
      res.send(posts);
    } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePost = async (req, res) => {
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
    res.status(400).send(error.message);
  }
};

module.exports = {
    createPost,
    getAllPosts,
    updatePost
  };