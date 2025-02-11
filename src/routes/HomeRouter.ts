import express, { Request, Response } from 'express';

const HomeRouter = express.Router();

HomeRouter.get('/', (req: Request, res: Response) => {
	res.render('misc/home', {title: 'Accueil'});
})

export default HomeRouter;