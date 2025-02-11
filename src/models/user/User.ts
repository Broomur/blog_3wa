import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db_connection';
import * as argon2 from 'argon2';

class User extends Model {
	declare id: number;
	declare nickname: string;
	declare mail: string;
	declare password: string;
	declare created_at: Date;
	declare updated_at: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			get() {
				return this.getDataValue('id');
			}
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: false,
			get() {
				return this.getDataValue('nickname');
			},
			set(val: string) {
				this.setDataValue('nickname', val)
			}
		},
		mail: {
			type: DataTypes.STRING,
			allowNull: false,
			get() {
				return this.getDataValue('mail');
			},
			set(val: string) {
				this.setDataValue('mail', val)
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			get() {
				return this.getDataValue('password');
			}
		}
	},
	{
		sequelize,
		tableName: 'users',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		hooks: {
			beforeCreate: async (user: User) => {
				user.password = await argon2.hash(user.password, { type: argon2.argon2id });
			},
			beforeUpdate: async (user: User) => {
				if (user.changed('password'))
					user.password = await argon2.hash(user.password, { type: argon2.argon2id });
			}
		}
	}
)

export default User;