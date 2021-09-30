const User = require('./User');
//Import the model
const Post = require("./Post");

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

//Export the user and post
module.exports = { User, Post };