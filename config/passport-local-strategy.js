const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
async function authenticateUser(email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        console.log('Invalid Username/Password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  }
  
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id); //this automattically encrypt id into the cookie
})


//deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) 
{
    try {
      const user = await User.findById(id);
      return done(null, user);
    } 
    catch (err) 
    {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  }
);

  //sending data to views
  //check if user is authenticated
 passport.checkAuthentication = function(req,res,next){
  if(req.isAuthenticated())//built in function in passport to check if req is authenticated or not
   {
    return next();  //if the user is signed in pass on the request to the next function(controller's action)
   }
   //if the user is not signed in
   return res.redirect('/users/sign-in');

 }

 passport.setAuthenticatedUser= function(req, res, next){
  if(req.isAuthenticated()){
    //req.user contains  the current signed in user fro the session cookie and we are just sending this to locals for the views   
    res.locals.user=req.user
  }
   next();
 }

module.exports = passport;