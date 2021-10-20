const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');


router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        post_url: 'https://handlebarsjs.com/guide/',
        title: 'Handlebars Docs',
        created_at: new Date(),
        vote_count: 10,
        comments: [{}, {}],
        user: {
            username: 'test_user'
        }
    });
});


// get all posts for homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
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
            console.log(dbPostData[0]);
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // pass a single post object into the homepage template
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single post
router.get('/post/:id', async (req, res) => {
    {
        try {
            const postData = Post.findByPk(req.params.id, {
                include: [User,
                    {
                        model: Comment,
                        include: [User],
                    },
                ],
            });

            if (postData) {
                const post = postData.get({ plain: true });

                res.render('single-post', { post });
            } else {
                res.status(404).end();
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

// Get a login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;