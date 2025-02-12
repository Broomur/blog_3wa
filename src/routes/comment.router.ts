import express from 'express';
import { commentController } from '../controllers/comment.controller';

const CommentRouter = express.Router();

CommentRouter.get('/create', (req, res) => commentController.formCreate(req, res));
CommentRouter.post('/create', (req, res) => commentController.createComment(req, res));
CommentRouter.get('/update', (req, res) => commentController.formUpdate(req, res));
CommentRouter.post('/update', (req, res) => commentController.updateComment(req, res));
CommentRouter.get('/delete', (req, res) => commentController.deleteComment(req, res));

export default CommentRouter;