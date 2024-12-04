const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments_controller');

router.post('/', commentsController.createComment);

router.put('/:id', commentsController.updateComment);

router.delete('/:id', commentsController.deleteComment);

router.get('/', commentsController.getAllCommentsForPost);

router.get('/:id', commentsController.getCommentById);

module.exports = router;