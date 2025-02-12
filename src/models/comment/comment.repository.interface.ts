import { Comment } from "../../entities/comment.entity";

export interface CommentRepositoryInterface {
	create(content: string, user_id: number, article_id: number): Promise<Comment>;
	getById(id: number): Promise<Comment | null>;
	getAll(): Promise<Comment[]>;
	getByArticle(article_id: number): Promise<Comment[]>;
	getByUser(user_id: number): Promise<Comment[]>;
	update(id: number, data: Partial<Comment>): Promise<Comment | null>;
	delete(id: number): Promise<boolean>;
}