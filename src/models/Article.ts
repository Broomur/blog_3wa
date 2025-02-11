import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db_connection';
import Owner from './Owner';

class Article extends Model {
  public id!: number;
};

Article.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'articles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Article.belongsTo(Owner, { foreignKey: 'id', as: 'owner'});
Owner.hasMany(Article, { foreignKey: 'owner_id', as: 'article'});

export default Article;

