import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db_connection';
import Owner from './Owner';

class Article extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare owner_id: number;
  declare created_at: Date;
  declare updated_at: Date;
};

Article.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('id');
      },
      set(val: string) {
        this.setDataValue('title', val);
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
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('owner_id');
      }
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