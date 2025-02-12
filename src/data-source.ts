import { DataSource } from 'typeorm';
import { Article } from './models/article/article.model';
import { Comment } from './models/comment/comment.model';
import { Owner } from './models/owner/owner.model';
import { User } from './models/user/user.model';
import { environment } from './environment.dev';

const { db_host, db_port, db_username, db_password, db_name } = environment;

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: db_host,
	port: db_port,
	username: db_username,
	password: db_password,
	database: db_name,
	synchronize: true,
	logging: false,
	entities: [Article, Comment, Owner, User],
	migrations: ['migrations/*-migration.ts'],
	migrationsRun: false,
	migrationsTableName: "migrations_table"
});

AppDataSource.initialize()
  .then(() => console.log('📌 Database initialized'))
  .catch((error) => console.error('❌ Database initialization failed', error));