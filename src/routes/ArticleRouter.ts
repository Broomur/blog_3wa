import express from 'express';
import PostController from '../controllers/ArticleController';
import AuthMiddleware from '../middlewares/authMiddleware';
import OwnerMiddleware from '../middlewares/ownerMiddleware';

const ArticleRouter = express.Router();


ArticleRouter.get('/detail/:id', PostController.detail);
ArticleRouter.get('/list', PostController.list);
ArticleRouter.get('/create', AuthMiddleware, OwnerMiddleware, PostController.form);
ArticleRouter.post('/create', AuthMiddleware, OwnerMiddleware, PostController.create);
ArticleRouter.get('/update', AuthMiddleware, OwnerMiddleware, PostController.formUpdate);
ArticleRouter.post('/update', AuthMiddleware, OwnerMiddleware, PostController.updateArticle);
ArticleRouter.get('/delete', AuthMiddleware, OwnerMiddleware, PostController.delete);

export default ArticleRouter;