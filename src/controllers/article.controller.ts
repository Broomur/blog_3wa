import { Request, Response } from 'express';
import { articleRepository } from '../models/article/article.repository';
import { commentRepository } from '../models/comment/comment.repository';
import { ArticleRepositoryInterface } from '../models/article/article.repository.interface';
import { CommentRepositoryInterface } from '../models/comment/comment.repository.interface';

class ArticleController {
	constructor(
		private articleRepository: ArticleRepositoryInterface,
		private commentRepository: CommentRepositoryInterface
	) {}

	form(req: Request, res: Response): void {
		res.render('article/create', {title: 'Rédaction d\'un article'});
	}

	async create(req: Request, res: Response): Promise<void> {
		const { title, content } = req.body;
		try {
			const owner_id = req.session.userId;
			if (owner_id) {
					const article = await this.articleRepository.create(
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

	async detail(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.path.split('/')[2]);
		try	 {
			const article = await this.articleRepository.getById(articleId);
			if (article) {
				if (req.session.userId && req.session.userId === article.owner_id)
					Object.assign(article, { editable: true })
				const comments = await this.commentRepository.getAll();
				for (let comment of comments)
					if (req.session.userId && comment.user_id === req.session.userId)
						Object.assign(comment, { editable: true});
				res.render('article/detail', {title: `détail de l'article ${articleId}`, article, comments});
			}
		} catch {
			res.render('misc/erreur', {title: '404', message: 'article non trouvé :('});
		}
	}

	async list(req: Request, res: Response): Promise<void> {
		const articles = await this.articleRepository.getAll();
		res.render('article/list', {title: 'liste des articles', articles})
	}

	async formUpdate(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		const article = await this.articleRepository.getById(articleId);
		res.render('article/update', {title: 'Editer un article', article});
	}

	async updateArticle(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		try {
			const { title, content } = req.body;
			await this.articleRepository.update(articleId, { title, content });
			res.redirect(`/article/detail/${articleId}`);
		} catch {
			res.status(500).redirect(`/article/detail/${articleId}`);
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['id']);
		try {
			await this.articleRepository.delete(articleId);
			res.redirect('/article/list');
		} catch {
			res.status(500).redirect('/');
		}
	}
}

export const articleController = new ArticleController(articleRepository, commentRepository);