const express=require('express');
const router= express.Router();
const passport = require('passport');
const postsController = require('../controllers/posts_controller')
// we still need to authenticate it because it can be possible that user knows our actions and all because it has signed in once and can create form using inspect in browser so we need to also authenticate it in router 
router.post('/create',passport.checkAuthentication,postsController.create);

module.exports = router;