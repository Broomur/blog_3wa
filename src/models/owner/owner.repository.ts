import { OwnerRepositoryInterface } from "./owner.repository.interface";
import { AppDataSource } from "../../data-source";
import { Owner } from "../../entities/owner.entity";
import { Repository } from "typeorm";


export class OwnerRepository implements OwnerRepositoryInterface {
	constructor(
		private owner: Repository<Owner>,
	) {}

	async create(id: number): Promise<Owner> {
		const owner = this.owner.create({
			id: id
		});
		await owner.save();
		return owner;
	}

	async getById(id: number): Promise<Owner | null> {
		return await this.owner.findOneBy({id});
	}

	async getAll(): Promise<Owner[]> {
		return this.owner.find();
	}

	async isOwner(user_id: number): Promise<boolean> {
		return !!await this.owner.findOneBy({id: user_id});
	}

	async delete(id: number): Promise<boolean> {
		return !!await this.owner.delete({id});
	}
}

const owner = AppDataSource.getRepository(Owner);

export const ownerRepository = new OwnerRepository(owner);