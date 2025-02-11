import { Request, Response } from 'express';
import Comment from "../models/comment/Comment";
import CommentRepository from '../models/comment/CommentRepository';

class CommentController {
	static formCreate(req: Request, res: Response): void {
		const articleId = Number(req.query['article']);
		res.render('comment/create', {title: 'Créer un commentaire', articleId})
	}

	static async createComment(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['article']);
		const { content } = req.body
		try {
			if (req.session.userId) {
				await CommentRepository.create(
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

	static async formUpdate(req: Request, res: Response): Promise<void> {
		const commentId = Number(req.query['id']);
		const comment = await CommentRepository.getById(commentId);
		res.render('comment/update', {title: 'Editer un commentaire', comment});
	}

	static async updateComment(req: Request, res: Response): Promise<void> {
		try {
			const commentId = Number(req.query['id']);
			const { content } = req.body;
			const comment = await CommentRepository.update(commentId, { content });
			res.redirect(`/article/detail/${comment[1][0].article_id}`);
		} catch {
			res.status(404).redirect(`/article/list`);
		}
	}

	static async deleteComment(req: Request, res: Response): Promise<void> {
	  try {
			const commentId = Number(req.query['id']);
			await CommentRepository.delete(commentId);
			res.redirect(`/article/list`);
		}
		catch(error) {
			res.status(404).redirect(`/article/list`);
		}
	} 
}

export default CommentController