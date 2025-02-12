import express, { Express } from 'express';
import ArticleRouter from './routes/article.router';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import UserRouter from './routes/user.router';
import HomeRouter from './routes/home.router';
import SessionMiddleware from './middlewares/session.middleware';
import AuthMiddleware from './middlewares/auth.middleware';
import OwnerRouter from './routes/owner.router';
import CommentRouter from './routes/comment.router';
import { environment } from './environment.dev';
import { env } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = environment.port;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({
	extended: false
}))
app.use(express.json());
app.use(session({
	name: "user",
	secret: environment.secret,
	resave: false,
	saveUninitialized: false
}));
app.use(SessionMiddleware);

app.use(HomeRouter);
app.use('/article', ArticleRouter);
app.use(UserRouter);
app.use('/owner', AuthMiddleware, OwnerRouter);
app.use('/comment', AuthMiddleware, CommentRouter);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}/`);
});
