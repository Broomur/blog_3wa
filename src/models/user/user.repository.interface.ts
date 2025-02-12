import { User } from "./user.model";

export interface UserRepositoryInterface {
	create(nickname: string, mail: string, password: string): Promise<User>;
	getById(id: number): Promise<User | null>;
	getByMail(mail: string): Promise<User | null>;
	getAll(): Promise<User[]>;
	verifyPassword(user: User, password: string): Promise<boolean>;
	update(id: number, data: Partial<User>): Promise<User | null>;
	delete(id: number): Promise<boolean>;
}