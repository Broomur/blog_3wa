import { NextFunction, Request, Response } from "express";

const OwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.session && req.session.owner)
		next();
	else
		res.redirect('/');
}

export default OwnerMiddleware;