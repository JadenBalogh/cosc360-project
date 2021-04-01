import sequelize_pkg from "sequelize";
import { sequelize } from "./sequelize.js";

const { DataTypes, Model } = sequelize_pkg;

// Model definitions
export class User extends Model {}

export class Post extends Model {}

export class Comment extends Model {}

// Attributes
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "User" }
);

Post.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Post" }
);

Comment.init(
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Comment" }
);

// Relations
User.hasMany(Post, {
  foreignKey: "userId",
});
Post.belongsTo(User, {
  foreignKey: "userId",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
});
Comment.belongsTo(Post, {
  foreignKey: "postId",
});
