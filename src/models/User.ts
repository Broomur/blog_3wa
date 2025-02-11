import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db_connection';

class User extends Model {
	public id!: number;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
		sequelize,
		tableName: 'users',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
)

export default User;