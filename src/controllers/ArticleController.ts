import { Request, Response } from 'express';
import Article from '../models/Article';
import CommentController from './CommentController';

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
					owner_id: 1
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
			await CommentController.articleComments(articleId)
			res.render('article/detail', {title: `détail de l'article ${articleId}`, article});
		} catch {
			res.render('misc/erreur', {title: '404', message: 'article non trouvé :('});
		}
	}

	static async list(req: Request, res: Response): Promise<void> {
		const articles = await Article.findAll({ raw: true });
		res.render('article/list', {title: 'liste des articles', articles})
	}
}

export default ArticleController;