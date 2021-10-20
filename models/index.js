const User = require('./User');
//Import the model Post
const Post = require("./Post");
// Import Vote
const Vote = require('./Vote');
// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

const Comment = require('./Comment');

// create associations User Section
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});
// User and Post associations
Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

// Comments Section
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
  

//Export the user and post
module.exports = { User, Post, Vote, Comment };