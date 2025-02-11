import { Request, Response } from 'express';
import Comment from "../models/Comment";

class CommentController {
	static formCreate(req: Request, res: Response): void {
		const articleId = Number(req.query['article']);
		res.render('comment/create', {title: 'Créer un commentaire', articleId})
	}

	static async createComment(req: Request, res: Response): Promise<void> {
		const articleId = Number(req.query['article']);
		const { content } = req.body
		try {
		const comment = await Comment.create(
			{
			content,
			user_id: req.session.userId,
			article_id: articleId
			}
		)
		res.redirect(`/article/detail/${articleId}`)
		} catch (error) {
				res.render('misc/erreur', {title: '500', message: 'erreur serveur :('})
		}
	}

	static async formUpdate(req: Request, res: Response): Promise<void> {
		const commentId = Number(req.query['id']);
		const comment = await Comment.findByPk(commentId);
		res.render('comment/update', {title: 'Editer un commentaire', comment});
	}

	static async updateComment(req: Request, res: Response): Promise<void> {
		try {
			const commentId = Number(req.query['id']);
			console.log(commentId)
			const comment = await Comment.findByPk(commentId);
			const { content } = req.body;
			if (comment) {
				comment.content = content;
				await comment.save();
				res.redirect(`/article/detail/${comment.article_id}`);
			}
		} catch {
			res.status(404).redirect(`/article/list`);
		}
	}

	static async deleteComment(req: Request, res: Response): Promise<void> {
	  try {
			const commentId = Number(req.query['id']);
			const comment = await Comment.findByPk(commentId);
			if (comment) {
				const articleId = comment.article_id;
				await comment.destroy();
				res.redirect(`/article/detail/${articleId}`);
			}
		}
		catch(error) {
			res.status(404).redirect(`/article/list`);
		}
	} 
}

export default CommentController