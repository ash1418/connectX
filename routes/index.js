const express= require('express'); //same instance used as in main index.js


const router = express.Router();
const homeController = require('../controllers/home_controller')
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

module.exports = router;