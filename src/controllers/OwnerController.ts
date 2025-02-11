import { Request, Response } from 'express';
import Owner from '../models/Owner';

class OwnerController {
	static async form(req: Request, res: Response): Promise<void> {
		const owner = await Owner.findByPk(req.session.userId);
		res.render('owner/update', {owner: !!owner});
	}

	static async update(req: Request, res: Response): Promise<void> {
		const owner = await Owner.findByPk(req.session.userId);
		if (owner) {
			req.session.owner = false;
			owner.destroy();
			res.render('owner/update', {owner: false});
		}
		else {
			req.session.owner = true;
			Owner.create({id: req.session.userId});
			res.render('owner/update', {owner: true});
		}

	}
}

export default OwnerController;