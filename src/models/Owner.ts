import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db_connection';
import User from './User';

class Owner extends Model {
	declare id: number;
	declare created_at: Date;
	declare updated_at: Date;
}

Owner.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			get() {
				return this.getDataValue('id');
			}
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