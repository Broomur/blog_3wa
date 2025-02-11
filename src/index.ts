import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import ArticleRouter from './routes/ArticleRouter';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import UserRouter from './routes/UserRouter';
import HomeRouter from './routes/HomeRouter';
import SessionMiddleware from './middlewares/sessionMiddleware';
import AuthMiddleware from './middlewares/authMiddleware';
import OwnerRouter from './routes/OwnerRouter';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({
	extended: false
}))
app.use(express.json());
app.use(session({
	name: "user",
	secret: process.env.SECRET || 'B4n4n4',
	resave: false,
	saveUninitialized: false
}));
app.use(SessionMiddleware);

app.use(HomeRouter);
app.use('/article', ArticleRouter);
app.use(UserRouter);
app.use('/owner', AuthMiddleware, OwnerRouter);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}/`);
});
