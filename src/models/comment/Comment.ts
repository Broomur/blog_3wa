import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db_connection';
import User from '../user/User';
import Article from '../article/Article';

class Comment extends Model {
	declare id: number;
	declare content: string;
	declare user_id: number;
	declare article_id: number;
	declare created_at: Date;
	declare updated_at: Date;
};

Comment.init(
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
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			get() {
				return this.getDataValue('content');
			},
			set(val: string) {
				this.setDataValue('content', val);
			}
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			get() {
				return this.getDataValue('user_id');
			}
		},
		article_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			get() {
				return this.getDataValue('article_id');
			}
		}
	},
	{
		sequelize,
		tableName: 'comments',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
);

User.hasMany(Comment, { foreignKey: 'user_id', as: 'comment' });
Comment.belongsTo(User, { foreignKey: 'id', as: 'user'});
Article.hasMany(Comment, { foreignKey: 'article_id', as: 'comment'});
Comment.belongsTo(Article, { foreignKey: 'id', as: 'article'});

export default Comment;