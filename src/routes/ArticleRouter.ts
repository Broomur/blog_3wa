import express from 'express';
import PostController from '../controllers/ArticleController';

const ArticleRouter = express.Router();

ArticleRouter.get('/create', PostController.form);
ArticleRouter.post('/create', PostController.create);
ArticleRouter.get('/detail/:id', PostController.detail);
ArticleRouter.get('/list', PostController.list);

export default ArticleRouter;