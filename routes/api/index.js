// Dependencies
const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

<<<<<<< HEAD

router.use('/comments', commentRoutes);
=======
// routes used
>>>>>>> feature/post
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;