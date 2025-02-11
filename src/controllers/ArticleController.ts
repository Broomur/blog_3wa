import { Request, Response } from 'express';
import Article from '../models/Article';
import CommentController from './CommentController';
import Comment from '../models/Comment';

class ArticleController {
	static form(req: Request, res: Response): void {
		res.render('article/create', {title: 'Rédaction d\'un article'});
	}

	static async create(req: Request, res: Response): Promise<void> {
		const { title, content } = req.body;
		try {
			const article = await Article.create(
				{
					title,
					content,
					owner_id: req.session.userId
				}
			);
			res.redirect(`/article/detail/${article.id}`);
		} catch (error) {
			res.render('misc/erreur', {title: '500', message: 'erreur serveur :('})
		}
	}

	static async detail(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.path.split('/')[2]);
		try {
			const article = await Article.findByPk(articleId, { raw: true });
			if (article) {
				if (req.session.userId && req.session.userId === article.owner_id)
					Object.assign(article, { editable: true })
				const comments = await Comment.findAll({ where: { article_id: article.id }, raw: true });
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
		const articles = await Article.findAll({ raw: true });
		res.render('article/list', {title: 'liste des articles', articles})
	}

	static async formUpdate(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		const article = await Article.findByPk(articleId, { raw: true });
		res.render('article/update', {title: 'Editer un article', article});
	}

	static async updateArticle(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		try {
			const article = await Article.findByPk(articleId);
			const { title, content } = req.body;
			if (article) {
				article.title = title;
				article.content = content;
				await article.save();
				res.redirect(`/article/detail/${article.id}`);
			}
		} catch {
			res.status(500).redirect(`/article/detail/${articleId}`);
		}
	}

	static async delete(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		const article = await Article.findByPk(articleId);
		if (article) {
			await article.destroy();
			res.redirect('/article/list');
		}
		else {
			res.status(500).redirect(`/article/detail/${articleId}`);
		}
	}
}

export default ArticleController;