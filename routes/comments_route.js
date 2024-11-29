const express = require("express");
const router = express.Router();
const commentController = require('../controllers/comments_controller');

router.post('/', commentController.createComment);

router.put('/comment/:id', commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

module.exports = router;