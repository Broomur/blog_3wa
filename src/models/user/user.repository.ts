import * as argon2 from 'argon2';
import { UserRepositoryInterface } from './user.repository.interface';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository implements UserRepositoryInterface {
	constructor(
		private user: Repository<User>
	) {}

	async create(nickname: string, mail: string, password: string): Promise<User> {
		const hash = await argon2.hash(password, { type: argon2.argon2id });
		const user = this.user.create({ nickname, mail, password: hash });
		await user.save();
		return user;
	}

	async getById(id: number): Promise<User | null> {
		return await this.user.findOneBy({ id });
	}

	async getByMail(mail: string): Promise<User | null> {
		return await this.user.findOneBy({ mail });
	}

	async getAll(): Promise<User[]> {
		return await this.user.find();
	}

	async verifyPassword(user: User, password: string): Promise<boolean> {
		return await argon2.verify(user.password, password);
	}

	async update(id: number, data: Partial<User>): Promise<User | null> {
		if (data.password) {
			data.password = await argon2.hash(data.password, { type: argon2.argon2id });
		}
		await this.user.update({ id }, data);
		return await this.user.findOneBy({ id });
	}

	async delete(id: number): Promise<boolean> {
		return !!await this.user.delete({ id });
	}
}

const user = AppDataSource.getRepository(User);

export const userRepository = new UserRepository(user);