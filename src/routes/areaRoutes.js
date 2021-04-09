const express = require('express');
const area = require('../controllers/areaController');
const  {verifyToken} = require('../middlewares/verifyToken');
const  {isUserValid }  = require('../middlewares/checkAuth');

const router = express.Router();

router.post('/calculate', verifyToken, isUserValid, area.calculate )
module.exports = router;