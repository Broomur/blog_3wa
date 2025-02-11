import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db_connection';
import User from './User';

class Owner extends Model {}

Owner.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		}
	},
	{
		sequelize,
		tableName: 'owners',
		timestamps: false
	}
);

User.hasOne(Owner, { foreignKey: 'id', as: 'owner' });
Owner.belongsTo(User, { foreignKey: 'id', as: 'user' });

export default Owner;