const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments_controller');

router.post('/', commentsController.createComment);

router.put('/comment/:id', commentsController.updateComment);

router.delete('/comment/:id', commentsController.deleteComment);

router.get('/:postId', commentsController.getAllCommentsForPost);

router.get('/:id', commentsController.getCommentById);

module.exports = router;