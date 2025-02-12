import { NextFunction, Request, Response } from "express";

const SessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
	res.locals.session = req.session;
	next();
}

export default SessionMiddleware;