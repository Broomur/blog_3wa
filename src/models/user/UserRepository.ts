import Article from '../article/Article';
import Comment from '../comment/Comment';
import User from './User';
import * as argon2 from 'argon2';

class UserRepository {
	static async create(nickname: string, mail: string, password: string): Promise<User> {
		return await User.create({ nickname, mail, password });
	}

	static async getById(id: number): Promise<User | null> {
		return await User.findByPk(id, {
			raw: true,
			include: [
				{ model: Comment, as: 'comment' }
			]
		});
	}

	static async getByMail(mail: string): Promise<User | null> {
		return await User.findOne({
			where: { mail },
			raw: true,
			include: [
				{ model: Comment, as: 'comment' }
			]
		});
	}

	static async getAll(): Promise<User[]> {
		return await User.findAll({
			raw: true,
			include: [
				{ model: Comment, as: 'comment' }
			]
		});
	}

	static async mailExists(mail: string): Promise<boolean> {
		return !!await User.findOne({ where: { mail }});
	}

	static async verifyPassword(user: User, password: string): Promise<boolean> {
		return await argon2.verify(user.password, password);
	}

	static async update(id: number, data: Partial<User>): Promise<[number, User[]]> {
		if (data.password) {
			data.password = await argon2.hash(data.password, { type: argon2.argon2id });
		}
		return await User.update(data, {
			where: { id },
			returning: true,
		});
	}

	static async delete(id: number): Promise<number> {
		return await User.destroy({ where: { id } });
	}
}

export default UserRepository;