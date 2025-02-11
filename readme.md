# Semaine 8 : développement d'application

## Exigences fonctionnelles

### Article
- affichage de la liste des articles
- affichage d'un article en particulier
- création d'un nouvel article

### Utilisateur
- connexion
- inscription

### Commentaire
- création d'un commentaire
- lecture d'un commentaire

## User stories

- En tant qu'invité·e je peux m'inscrire.
- En tant qu'invité·e je peux consulter les commentaires.
- En tant qu'invité·e je peux consulter la liste des articles.
- En tant qu'invité·e je peux consulter un article.
- En tant que lecteur·rice je peux me connecter.
- En tant que lecteur·rice je peux laisser un commentaire.
- En tant que propriétaire je peux rédiger un article.

## DB

```shell
docker run -d --rm --name postgres_blog -p 5432:5432 -e POSTGRES_USER=St34m_P1n34ppl3 -e POSTGRES_PASSWORD=M4gn1f1c3nt_L1tch1 -e POSTGRES_DB=blog postgres:latest
```

```sql
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	nickname VARCHAR(40) NOT NULL,
	mail VARCHAR(50) NOT NULL,
	password VARCHAR(250) NOT NULL,
	created_at DATE,
	updated_at DATE,
	last_login DATE
);

CREATE TABLE owners (
	id SERIAL PRIMARY KEY
);
ALTER TABLE owners
ADD CONSTRAINT FK_Owners_Users FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE;

CREATE TABLE articles (
	id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	content TEXT NOT NULL,
	created_at DATE,
	updated_at DATE,
	owner_id INT NOT NULL
);
ALTER TABLE articles
ADD CONSTRAINT FK_Articles_Owners FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE;

CREATE TABLE comments(
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	created_at DATE,
	updated_at DATE,
	user_id INT,
	article_id INT
);
ALTER TABLE comments
ADD CONSTRAINT FK_Comments_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE comments
ADD CONSTRAINT FK_Articles_Comments FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE;
```

## serveur express.ts

```shell
npm i -D typescript @types/node @types/express nodemon tsx typescript
npm i dotenv express pug
npx tsc --init
```

### nodemon.json :

```json
{
	"watch": ["src"],
	"ext": "ts,json",
	"ignore": ["src/**/*.spec.ts"],
	"exec": "npx tsx ./src/index.ts"
}
```

### package.json :

```json
{
	...
	"scripts": {
		"build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon",
    "db": "docker run -d --rm --name postgres_blog -p 5432:5432 -e POSTGRES_USER=St34m_P1n34ppl3 -e POSTGRES_PASSWORD=M4gn1f1c3nt_L1tch1 -e POSTGRES_DB=blog postgres:latest",
	...
	},
	...,
	"type": "module",
	...
}

### tsconfig.json :

```json
"compilerOptions": {
	...,
	"outDir": "./dist",
	...
}
```
