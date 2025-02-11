import { Request, Response } from 'express';
import UserRepository from '../models/user/UserRepository';
import OwnerRepository from '../models/owner/OwnerRepository';

class UserController {
	static formRegister(req: Request, res: Response): void {
		res.render('user/register', {title: 'Inscription'});
	}

	static async register(req: Request, res: Response): Promise<void> {
		const { nickname, mail, password, password_verif } = req.body;
		if (password !== password_verif) {
			res.status(422).json({
				error: 'password verify failed'
			});
			return;
		}
		try { 
			await UserRepository.create(nickname, mail, password);
			res.redirect('/login');
		} catch {
			res.status(500).json({
				error: 'error server'
			})
		}
	}

	static async formLogin(req: Request, res: Response): Promise<void> {
		res.render('user/login', {title: 'Connexion'});
	}

	static async login(req: Request, res: Response): Promise<void> {
		const { mail, password } = req.body;
		if (!mail || !password) {
			req.session.message = { status: false, message: "Merci de remplir tout les champs" };
			res.redirect("/login");
		}
		const user = await UserRepository.getByMail(mail);
		if (user) {
			const isMatch = await UserRepository.verifyPassword(user, password);
			if (!isMatch) {
				req.session.message = { status: false, message: 'Password incorrect' };
				res.redirect('/login')
			} else if (isMatch) {
				req.session.auth = true;
				req.session.userId = user.id;
				req.session.message = { status: true, message: 'Connexion réussie' };
				req.session.owner = !!await OwnerRepository.getById(user.id);
				res.redirect('article/list');
			}
		}
	}

	static async logout(req: Request, res: Response): Promise<void> {
		req.session.auth = false;
		req.session.message = { status: true, message: 'Déconnexion' };
		res.redirect('/');
	}
}

export default UserController;