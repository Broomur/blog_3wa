import { Request, Response } from 'express';
import Article from '../models/article/Article';
import CommentController from './CommentController';
import Comment from '../models/comment/Comment';
import ArticleRepository from '../models/article/ArticleRepository';
import CommentRepository from '../models/comment/CommentRepository';

class ArticleController {
	static form(req: Request, res: Response): void {
		res.render('article/create', {title: 'Rédaction d\'un article'});
	}

	static async create(req: Request, res: Response): Promise<void> {
		const { title, content } = req.body;
		try {
			const owner_id = req.session.userId;
			if (owner_id) {
				const article = await ArticleRepository.create(
						title,
						content,
						owner_id
				);
				res.redirect(`/article/detail/${article.id}`);
			} else
			res.status(403).redirect('/');
		} catch (error) {
			res.render('misc/erreur', {title: '500', message: 'erreur serveur :('})
		}
	}

	static async detail(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.path.split('/')[2]);
		try {
			const article = await ArticleRepository.getById(articleId);
			if (article) {
				if (req.session.userId && req.session.userId === article.owner_id)
					Object.assign(article, { editable: true })
				const comments = await CommentRepository.getAll();
				for (let comment of comments)
					if (req.session.userId && comment.user_id === req.session.userId)
						Object.assign(comment, { editable: true});
				res.render('article/detail', {title: `détail de l'article ${articleId}`, article, comments});
			}
		} catch {
			res.render('misc/erreur', {title: '404', message: 'article non trouvé :('});
		}
	}

	static async list(req: Request, res: Response): Promise<void> {
		const articles = await ArticleRepository.getAll();
		res.render('article/list', {title: 'liste des articles', articles})
	}

	static async formUpdate(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		const article = await ArticleRepository.getById(articleId);
		res.render('article/update', {title: 'Editer un article', article});
	}

	static async updateArticle(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		try {
			const { title, content } = req.body;
			await ArticleRepository.update(articleId, { title, content });
			res.redirect(`/article/detail/${articleId}`);
		} catch {
			res.status(500).redirect(`/article/detail/${articleId}`);
		}
	}

	static async delete(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		try {
			await ArticleRepository.delete(articleId);
			res.redirect('/article/list');
		} catch {
			res.status(500).redirect('/');
		}
	}
}

export default ArticleController;