import { Article } from "../../entities/article.entity";

export interface ArticleRepositoryInterface {
	create(title: string, content: string, owner_id: number): Promise<Article>;
	getById(id: number): Promise<Article | null>;
	getAll(): Promise<Article[]>;
	getByOwner(owner_id: number): Promise<Article[]>;
	update(id: number, data: Partial<Article>): Promise<Article | null>;
	delete(id: number): Promise<void>;
}
