import { Request, Response } from 'express';
import { userRepository } from '../models/user/user.repository';
import { ownerRepository } from '../models/owner/owner.repository';
import { UserRepositoryInterface } from '../models/user/user.repository.interface';
import { OwnerRepositoryInterface } from '../models/owner/owner.repository.interface';
import * as argon2 from 'argon2';

class UserController {
	constructor(
		private userRepository: UserRepositoryInterface,
		private ownerRepository: OwnerRepositoryInterface,
	) {}

	formRegister(req: Request, res: Response): void {
		res.render('user/register', {title: 'Inscription'});
	}

	async register(req: Request, res: Response): Promise<void> {
		const { nickname, mail, password, password_verif } = req.body;
		if (password !== password_verif) {
			res.status(422).json({
				error: 'password verify failed'
			});
			return;
		}
		try {
			await this.userRepository.create(nickname, mail, password);
			res.redirect('/login');
		} catch {
			res.status(500).json({
				error: 'error server'
			})
		}
	}

	async formLogin(req: Request, res: Response): Promise<void> {
		res.render('user/login', {title: 'Connexion'});
	}

	async login(req: Request, res: Response): Promise<void> {
		const { mail, password } = req.body;
		if (!mail || !password) {
			req.session.message = { status: false, message: "Merci de remplir tout les champs" };
			res.redirect("/login");
		}
		const user = await this.userRepository.getByMail(mail);
		if (user) {
			const isMatch = await this.userRepository.verifyPassword(user, password);
			if (!isMatch) {
				req.session.message = { status: false, message: 'Password incorrect' };
				res.redirect('/login')
			} else if (isMatch) {
				req.session.auth = true;
				req.session.userId = user.id;
				req.session.message = { status: true, message: 'Connexion réussie' };
				req.session.owner = !!await this.ownerRepository.getById(user.id);
				res.redirect('article/list');
			}
		}
	}

	async logout(req: Request, res: Response): Promise<void> {
		req.session.auth = false;
		req.session.message = { status: true, message: 'Déconnexion' };
		res.redirect('/');
	}
}

export const userController = new UserController(userRepository, ownerRepository);
