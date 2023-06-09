const express = require('express');
const app=express();
const port=8000;
const expresslayouts= require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//used for sessioncookie 
const session= require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);  //to store the session in mongodb so that user cant be loggedout when we restart the server
const sassMiddleware = require('node-sass-middleware');  //for sass

app.use(sassMiddleware({
   src: './assets/scss',
   dest: './assets/css',
   debug: true, //show if there was any errors
   outputStyle: 'extended',   //do i want every thing in single line or multiple line multiple =extended single=compress
   prefix:  '/css'     //where should server lookout for css files 
}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expresslayouts);
//extract style and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


 //set up the view engine
 app.set('view engine' , 'ejs');
 app.set('views','./views');
//mongo store is used to store the session cookie in the db
 app.use(session({
    name: 'codial',
    // TODO change the secret before deoloyement in production mode
    secret: 'blahsomething',
    saveUninitialized: false, //session that is not initialized (user has not logged in ) dont store in cookie
    resave:false,  //when the identity is established dont rewrite until any changes  
    cookie:{
       maxAge:(1000 * 60 * 100)  //in terms of milliseconds
    },  //age after cookie expires
    store: new MongoStore(
      {
        // mongoUrl: 'mongodb://localhost:27017/codial_development',
         mongooseConnection: db,
         //ttl: 14 * 24 * 60 * 60, // = 14 days. Default
         autoRemove: 'disabled'
      
      },
      function(err){
         console.log(err || 'connect-mongodb setup ok');
      }
    )
 }));


 app.use(passport.initialize());
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);

 //use express router
 app.use('/', require('./routes/index'));
 
app.listen(port,function(err)
{
    if(err)
    console.log(`Error in running server : ${err}`);
    console.log(`Server is running on port: ${port}`);
}

);                                                                                                                                       