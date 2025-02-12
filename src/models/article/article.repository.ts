import { AppDataSource } from "../../data-source";
import { Article } from "./article.model";
import { ArticleRepositoryInterface } from "./article.repository.interface";

class ArticleRepository implements ArticleRepositoryInterface {
	private article = AppDataSource.getRepository(Article);

	async create(title: string, content: string, owner_id: number): Promise<Article> {
		const article = this.article.create({
			title: title,
			content: content,
			owner: { id: owner_id }
		});
		await article.save();
		console.log(article);
		return article;
	}

	async getById(id: number) : Promise<Article | null> {
		return await this.article.findOneBy({id});
	}

	async getAll(): Promise<Article[]> {
		return await this.article.find();
	}

	async getByOwner(owner_id: number): Promise<Article[]> {
		return await this.article.findBy({
			owner: { id: owner_id }
		})
	}

	async update(id: number, data: Partial<Article>): Promise<Article | null> {
		await this.article.update({id}, data);
		return await this.article.findOneBy({id});
	}

	async delete(id: number): Promise<boolean> {
		return !!await this.article.delete({id});
	}
}

export default ArticleRepository;