import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comment.entity";
import { CommentRepositoryInterface } from "./comment.repository.interface";

export class CommentRepository implements CommentRepositoryInterface {
	constructor(
		private comment: Repository<Comment>
	) {}

	async create(content: string, user_id: number, article_id: number): Promise<Comment> {
		const comment = this.comment.create({
			content: content,
			user: { id: user_id },
			article: { id: article_id }
		});
		await comment.save();
		return comment;
	}

	async getById(id: number): Promise<Comment | null> {
		return await this.comment.findOneBy({ id });
	}

	async getAll(): Promise<Comment[]> {
		return await this.comment.find();
	}

	async getByArticle(article_id: number): Promise<Comment[]> {
		return await this.comment.findBy({
			article: { id: article_id }
		});
	}

	async getByUser(user_id: number): Promise<Comment[]> {
		return await this.comment.findBy({
			user: { id: user_id }
		});
	}

	async update(id: number, data: Partial<Comment>): Promise<Comment | null> {
		await this.comment.update({id}, data);
		return await this.comment.findOneBy({ id });
	}

	async delete(id: number): Promise<boolean> {
		return !!await this.comment.delete({ id });
	}
}


const comment = AppDataSource.getRepository(Comment);

export const commentRepository = new CommentRepository(comment);