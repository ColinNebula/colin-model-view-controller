// Dependencies
const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

<<<<<<< HEAD:controllers/api/index.js

router.use('/comments', commentRoutes);
=======
// routes used
>>>>>>> feature/post:routes/api/index.js
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;