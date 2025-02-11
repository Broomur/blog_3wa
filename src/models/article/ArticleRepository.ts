import Owner from '../owner/Owner';
import Article from './Article';

class ArticleRepository {
	static async create(title: string, content: string, owner_id: number): Promise<Article> {
		return await Article.create({ title, content, owner_id }, { raw: true });
	}

	static async getById(id: number) : Promise<Article | null> {
		return await Article.findByPk(id, { 
			raw: true,
			include: [
				{ model: Owner, as: 'owner' }
			]
		});
	}

	static async getAll(): Promise<Article[]> {
		return await Article.findAll({
			raw: true,
			include: [
				{ model: Owner, as: 'owner' }
			]
		});
	}

	static async getByOwner(owner_id: number): Promise<Article[]> {
		return await Article.findAll({
			where: { owner_id },
			include: [
				{ model: Owner, as: 'owner' }
			]
		});
	}

	static async update(id: number, data: Partial<Article>): Promise<[number, Article[]]> {
		return await Article.update(data, {
			where: { id },
			returning: true
		});
	}

	static async delete(id: number): Promise<number> {
		return await Article.destroy({ where: { id } });
	}
}

export default ArticleRepository;