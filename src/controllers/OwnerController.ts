import { Request, Response } from 'express';
import OwnerRepository from '../models/owner/OwnerRepository';

class OwnerController {
	static async form(req: Request, res: Response): Promise<void> {
		if (req.session.userId) {
			const owner = await OwnerRepository.getById(req.session.userId);
			res.render('owner/update', {owner: !!owner});
		}
	}

	static async update(req: Request, res: Response): Promise<void> {
		if (req.session.userId) {
			const owner = await OwnerRepository.getById(req.session.userId);
			if (owner) {
				req.session.owner = false;
				owner.destroy();
				res.render('owner/update', {owner: false});
			}
			else {
				req.session.owner = true;
				OwnerRepository.create(req.session.userId);
				res.render('owner/update', {owner: true});
			}
		}
	}
}

export default OwnerController;