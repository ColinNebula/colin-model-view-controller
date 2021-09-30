const apiRoutes = require('./api');
const router = require('express').Router();
const homeRoutes = require('./home-routes.js');


// API routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;