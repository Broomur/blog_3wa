import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

class UserController {
	static form(req: Request, res: Response): void {
		res.render('user/create', {title: 'Inscription'});
	}

	static async register(req: Request, res: Response): Promise<void> {
		const { nickname, mail, password, password_verif } = req.body;
		if (password !== password_verif)
			res.status(422).json({
				error: 'password verify failed'
			});
		const newUser = {
			nickname,
			mail,
			password: CryptoJS.HmacSHA256(password, SECRET || 'B4n4n4')
		}
		try {
			const user = await User.create(newUser);
			res.redirect('/login');
		} catch {
			res.status(500).json({
				error: 'error server'
			})
		}
	}
}

export default UserController;