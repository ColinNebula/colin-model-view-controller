const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // columns will go here
    // comment_text: req.body.comment_text,
    //     comment_id: req.body.comment_id,
    //     post_id: req.body.post_id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  comment_text: {
      type: DataTypes.STRING,
      allowNull: false
  },
  
  user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'post',
        key: 'id'
    }
}
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;