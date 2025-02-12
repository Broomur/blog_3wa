import { OwnerRepositoryInterface } from "./owner.repository.interface";
import { Owner } from "./owner.model";
import { AppDataSource } from "../../data-source";


class OwnerRepository implements OwnerRepositoryInterface {
	private owner = AppDataSource.getRepository(Owner);

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

export default OwnerRepository