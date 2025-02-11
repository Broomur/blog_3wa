
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
  // static async createComment(req: Request, res: Response): Promise<void> {

  // }
  // static async updateComment(req: Request, res: Response): Promise<void> {

  // }
  // static async deleteComment(req: Request, res: Response): Promise<void> {

}


export default CommentController