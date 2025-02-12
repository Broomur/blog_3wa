import { Owner } from "../../entities/owner.entity";

export interface OwnerRepositoryInterface {
	create(id: number): Promise<Owner>;
	getById(id: number): Promise<Owner | null>;
	getAll(): Promise<Owner[]>;
	isOwner(user_id: number): Promise<boolean>;
	delete(id: number): Promise<boolean>;
}