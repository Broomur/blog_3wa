import Article from "../article/Article";
import User from "../user/User";
import Owner from "./Owner";

class OwnerRepository {
	static async create(id: number): Promise<Owner> {
		return await Owner.create({ id });
	}

	static async getById(id: number): Promise<Owner | null> {
		return await Owner.findByPk(id, {
			raw: true,
			include: [
				{ model: Article, as: 'article' },
				{ model: User, as: 'user' }
			]
		});
	}

	static async getAll(): Promise<Owner[]> {
		return Owner.findAll({
			raw: true,
			include: [
				{ model: Article, as: 'article' },
				{ model: User, as: 'user' }
			]
		});
	}

	static async isOwner(user_id: number): Promise<boolean> {
		return !!await Owner.findByPk(user_id);
	}

	static async delete(id: number): Promise<number> {
		return await Owner.destroy({ where: { id } });
	}
}

export default OwnerRepository