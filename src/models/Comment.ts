import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db_connection';
import User from './User';
import Article from './Article';

class Comment extends Model {};

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		article_id: {
			type: DataTypes.INTEGER,
			allowNull: false
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