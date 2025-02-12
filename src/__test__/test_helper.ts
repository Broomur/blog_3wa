import { DataSource } from "typeorm";
import { environment } from "../environment.dev";
import * as entities from '../entities';

const { db_host, db_port, db_username, db_password, db_name } = environment;

export class TestHelper {
	private static _instance: TestHelper;

	private constructor() {}

	public static get instance(): TestHelper {
		if (!this._instance) this._instance = new TestHelper();
		return this._instance;
	}

	private dbConnect!: DataSource;

	getRepo(entity: string) {
			return this.dbConnect.getRepository(entity);
	}

	async setupTestDB() {
		const entitiesList = [...Object.values(entities)];
		this.dbConnect = new DataSource({
			name: 'unit-tests',
			type: 'postgres',
			host: db_host,
			port: db_port,
			username: db_username,
			password: db_password,
			database: 'test',
			entities: entitiesList,
			synchronize: false
		});
		await this.dbConnect.initialize();
	}

	async teardownTestDB() {
		if (this.dbConnect.isInitialized) await this.dbConnect.destroy();
	}
}