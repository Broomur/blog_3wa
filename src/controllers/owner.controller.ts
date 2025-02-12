import { Request, Response } from 'express';
import { ownerRepository } from '../models/owner/owner.repository';
import { OwnerRepositoryInterface } from '../models/owner/owner.repository.interface';

class OwnerController {
	constructor(
		private ownerRepository: OwnerRepositoryInterface
	) {}

	async form(req: Request, res: Response): Promise<void> {
		if (req.session.userId) {
			const owner = await this.ownerRepository.getById(req.session.userId);
			res.render('owner/update', {owner: !!owner});
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		if (req.session.userId) {
			if (req.session.owner) {
				await this.ownerRepository.delete(req.session.userId);
				req.session.owner = false;
				res.render('owner/update', {owner: false})
			}
			else if (!req.session.owner){
				await this.ownerRepository.create(req.session.userId);
				req.session.owner = true;
				res.render('owner/update', {owner: true});
			}
		}
	}
}

export const ownerController = new OwnerController(ownerRepository);