// Dependencies
const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

// routes used
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;