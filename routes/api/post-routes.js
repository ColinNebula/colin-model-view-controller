const router = require('express').Router();
<<<<<<< HEAD
const sequelize = require('../../config/connection');
const { Post, User, Vote, Comment } = require('../../models');
=======
const { Post, User, Vote } = require('../../models');
const sequelize = require('../../config/connection');
>>>>>>> feature/post

// get all posts
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
<<<<<<< HEAD
=======
    attributes: ['id', 
    'post_url', 
    'title', 
    'created_at',
    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],

>>>>>>> feature/post
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
   })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find a post by Id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
<<<<<<< HEAD
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
=======
    attributes: ['id', 
    'post_url', 
    'title', 
    'created_at'
    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
  ],
>>>>>>> feature/post
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Create a Post
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Update a post
router.put('/upvote', (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote(req.body, { Vote })
    .then(updatedPostData => res.json(updatedPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

<<<<<<< HEAD
// Update a post by id
=======
// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
  Post.upvote(req.body, { Vote })
  
  Vote.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id
  }).then(() => {
    // then find the post we just voted on
    return Post.findOne({
      where: {
        id: req.body.post_id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
    
        [
          sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
          'vote_count'
        ]
      ]
    })
    .then(updatedPostData => res.json(updatedPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
});
});
// Update post
>>>>>>> feature/post
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
})


module.exports = router;
