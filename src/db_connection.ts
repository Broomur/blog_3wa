import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config()

const {DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
	logging: false
});

const connectDB = async () => {
	try {
	  await sequelize.authenticate();
	  console.log('✅ Connection has been established successfully.');
	} catch (error) {
	  console.error('❌ Unable to connect to the database:', error);
	}
};

export { sequelize, connectDB };