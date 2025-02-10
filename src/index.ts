import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import ArticleRouter from './routes/ArticleRouter';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());

app.use(ArticleRouter);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}/`);
});
