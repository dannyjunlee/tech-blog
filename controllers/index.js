const router = require('express').Router();

// const xRoutes = require('./xxx');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// router.use('/', xxx)
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
