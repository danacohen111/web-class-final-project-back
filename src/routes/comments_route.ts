import express from "express";
import commentsController from '../controllers/comments_controller';

const router = express.Router();
router.post('/', commentsController.createComment.bind(commentsController));

router.put('/:id', commentsController.updateComment.bind(commentsController));

router.delete('/:id', commentsController.deleteComment.bind(commentsController));

router.get('/', commentsController.getComments.bind(commentsController));

router.get('/:id', commentsController.getComments.bind(commentsController));

export default router;
