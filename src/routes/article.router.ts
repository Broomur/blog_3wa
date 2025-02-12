import express from 'express';
import { articleController } from '../controllers/article.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import OwnerMiddleware from '../middlewares/owner.middleware';

const ArticleRouter = express.Router();


ArticleRouter.get('/detail/:id', (req, res) => articleController.detail(req, res));
ArticleRouter.get('/list', (req, res) => articleController.list(req, res));
ArticleRouter.get('/create', AuthMiddleware, OwnerMiddleware, (req, res) => articleController.form(req, res));
ArticleRouter.post('/create', AuthMiddleware, OwnerMiddleware, (req, res) => articleController.create(req, res));
ArticleRouter.get('/update', AuthMiddleware, OwnerMiddleware, (req, res) => articleController.formUpdate(req, res));
ArticleRouter.post('/update', AuthMiddleware, OwnerMiddleware, (req, res) => articleController.updateArticle(req, res));
ArticleRouter.get('/delete', AuthMiddleware, OwnerMiddleware, (req, res) => articleController.delete(req, res));

export default ArticleRouter;