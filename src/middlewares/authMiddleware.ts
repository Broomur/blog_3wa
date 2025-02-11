import { NextFunction, Request, Response } from "express";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.session && req.session.auth)
		next();
	else
		res.redirect('/login');
};

export default AuthMiddleware;