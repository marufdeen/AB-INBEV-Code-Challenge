const express = require('express'); 
const userRoutes = require('./userRoutes');
const areaRoutes = require('./areaRoutes') 
const router = express.Router();  

router.get("/", (req, res) => res.send("Welcome to youDeyGo. A car pooling router ...🚗")); 

// User Routes
router.use(userRoutes)

// Calculation Routes
router.use(areaRoutes);
 
module.exports = router;
