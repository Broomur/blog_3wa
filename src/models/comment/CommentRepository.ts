import Article from "../article/Article";
import User from "../user/User";
import Comment from "./Comment";

class CommentRepository {
	static async create(content: string, user_id: number, article_id: number): Promise<Comment> {
		return await Comment.create({ content, user_id, article_id });
	}

	static async getById(id: number): Promise<Comment | null> {
		return await Comment.findByPk(id, {
			raw: true,
			include: [
				{ model: User, as: 'user' },
				{ model: Article, as: 'article' }
			]
		});
	}

	static async getAll(): Promise<Comment[]> {
		return await Comment.findAll({
			raw: true,
			include: [
				{ model: User, as: 'user' },
				{ model: Article, as: 'article' }
			]
		});
	}

	static async getByArticle(article_id: number): Promise<Comment[]> {
		return await Comment.findAll({
			where: { article_id },
			raw: true,
			include: [
				{ model: User, as: 'user' },
				{ model: Article, as: 'article' }
			]
		});
	}

	static async getByUser(user_id: number): Promise<Comment[]> {
		return await Comment.findAll({
			where: { user_id },
			raw: true,
			include: [
				{ model: User, as: 'user' },
				{ model: Article, as: 'article'}
			]
		});
	}

	static async update(id: number, data: Partial<Comment>): Promise<[number, Comment[]]> {
		return await Comment.update(data, {
			where: { id },
			returning: true
		});
	}

	static async delete(id: number): Promise<number> {
		return await Comment.destroy({ where: { id }});
	}
}

export default CommentRepository