import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db_connection";

class Article extends Model {}

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
  }
);

export default Article;

