import { Request, Response } from 'express';
import { CommentRepositoryInterface } from '../models/comment/comment.repository.interface';
import CommentRepository from '../models/comment/comment.repository';

class CommentController {
	constructor(
		private commentRepository: CommentRepositoryInterface
	) {}

	formCreate(req: Request, res: Response): void {
		const articleId = Number(req.query['article']);
		res.render('comment/create', {title: 'Créer un commentaire', articleId})
	}

	async createComment(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['article']);
		const { content } = req.body
		try {
			if (req.session.userId) {
				await this.commentRepository.create(
					content,
					req.session.userId,
					articleId
				)
				res.redirect(`/article/detail/${articleId}`)
			}
		} catch (error) {
				res.render('misc/erreur', {title: '500', message: 'erreur serveur :('})
		}
	}

	async formUpdate(req: Request, res: Response): Promise<void> {
		const commentId = Number(req.query['id']);
		const comment = await this.commentRepository.getById(commentId);
		res.render('comment/update', {title: 'Editer un commentaire', comment});
	}

	async updateComment(req: Request, res: Response): Promise<void> {
		try {
			const commentId = Number(req.query['id']);
			const { content } = req.body;
			const comment = await this.commentRepository.update(commentId, { content });
			res.redirect(`/article/detail/${comment!.article.id}`);
		} catch {
			res.status(404).redirect(`/article/list`);
		}
	}

	async deleteComment(req: Request, res: Response): Promise<void> {
	  try {
			const commentId = Number(req.query['id']);
			await this.commentRepository.delete(commentId);
			res.redirect(`/article/list`);
		}
		catch(error) {
			res.status(404).redirect(`/article/list`);
		}
	} 
}

const commentRepository = new CommentRepository();

export const commentController = new CommentController(commentRepository);