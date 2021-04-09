const express = require('express'); 
const userRoutes = require('./userRoutes')
const router = express.Router();  

router.get("/", (req, res) => res.send("Welcome to youDeyGo. A car pooling router ...🚗")); 

// User Routes
router.use(userRoutes)
 
module.exports = router;
