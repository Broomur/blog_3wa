import { DataSource } from 'typeorm';
import * as entities from './entities';
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
	entities: [...Object.values(entities)],
	migrations: ['migrations/*-migration.ts'],
	migrationsRun: false,
	migrationsTableName: "migrations_table"
});

AppDataSource.initialize()
  .then(() => console.log('📌 Database initialized'))
  .catch((error) => console.error('❌ Database initialization failed', error));