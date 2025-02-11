import express from 'express';
import CommentController from '../controllers/CommentController';

const CommentRouter = express.Router();

CommentRouter.get('/create', CommentController.formCreate);
CommentRouter.post('/create', CommentController.createComment);
CommentRouter.get('/update', CommentController.formUpdate);
CommentRouter.post('/update', CommentController.updateComment);
CommentRouter.get('/delete', CommentController.deleteComment);

export default CommentRouter;