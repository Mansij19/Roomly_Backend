const express = require('express');
const router = express.Router();
const hotelRoutes = require('./hotelRoutes');

router.use('/hotels', hotelRoutes);

module.exports = router;
