import express from 'express';
import PostController from '../controllers/ArticleController';
import AuthMiddleware from '../middlewares/authMiddleware';

const ArticleRouter = express.Router();


ArticleRouter.get('/create', AuthMiddleware, PostController.form);
ArticleRouter.post('/create', AuthMiddleware, PostController.create);
ArticleRouter.get('/detail/:id', PostController.detail);
ArticleRouter.get('/list', PostController.list);

export default ArticleRouter;