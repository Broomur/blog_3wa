import { Request, Response } from 'express';
import Comment from "../models/Comment";
import { Op } from "sequelize";

class CommentController {
  static async articleComments(articleId: number) {
    try {
      const comments = await Comment.findAll({
        where: {
          article_id: { [Op.eq]: articleId }
        }
      });
      return comments
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  }
  // static async userComments(req: Request, res: Response): Promise<void> {

  // }
  static async createComment(req: Request, res: Response): Promise<void> {
    const articleId = Number(req.path.split('=')[1]);  
    const content = req.body
    try {
      const comment = await Comment.create(
        {
          content
        }
      )
      res.redirect(`/article/detail/${articleId}`)
    } catch (error) {
			res.render('misc/erreur', {title: '500', message: 'erreur serveur :('})
  }
  // static async updateComment(req: Request, res: Response): Promise<void> {

  // }
  // static async deleteComment(commentId: number) {
  //   try {
  //     const comment = await Comment.findAll({
  //       where: {
  //         article_id: { [Op.eq]: commentId}
  //       }
  //     }
  //   )}
  //   catch(error) {
  //     console.error("Erreur lors de la récupération du commentaire :", error)
  //   }
  // } 
}
}

export default CommentController