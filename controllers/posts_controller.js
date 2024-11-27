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

const getPostsBySender = async (senderId, res) => {
  try {
    const posts = await PostModel.find({ senderID: senderId });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPosts = async (req, res) => {
  const senderId = req.query.sender;
  if (senderId) {
    return getPostsBySender(senderId, res);
  }
  try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = {
    createPost,
    getAllPosts,
    getPostsBySender
  };