const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments_controller');

router.post('/', commentsController.createComment);

router.put('/comment/:id', commentsController.updateComment);

router.put('/:id', commentController.updateComment);

router.delete('/:id', commentController.deleteComment);
router.get('/:postId', commentsController.getAllCommentsForPost);

module.exports = router;