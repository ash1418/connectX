const User = require('../models/user');

module.exports.profile=function(req,res){
    //res.end('<h1>User Profile</h1>');
    res.render('profile', {
        title: "profile"
    })
}

module.exports.signUp=function(req,res){
    res.render('user_sign_up',{
        title: "Codial | Sign up"
    })
}

module.exports.signIn= function(req,res){
    res.render('user_sign_in',{
        title: "Codial | Sign in"
    })
}

//get the sign up data
// module.exports.create=function(req,res){
//     if(req.body.password!=req.body.confirm_password)
//     {return redirect('back');}
    

//     User.findOne({email: req.body.email},function(err, user){
//          if(err){console.log('error in finding user in signing up'); return}
         
//          if(!user){
//             User.create(req.body, function(err,user)
//             {
//                 if(err){
//                     console.log('error in creating user in signing up'); 
//                     return
//                 }
//                 return res.redirect('/users/sign-in');

//             })
//          }
//          else {
//             return  res.redirect('back');
//          }

//     })


// }
module.exports.create = async function(req, res) {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.redirect('back');
      }
      const newUser = await User.create(req.body);
      return res.redirect('/users/sign-in');
    } catch (error) {
      console.error('Error in creating user:', error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

//sign in and create a session for the user
module.exports.createSession=function(req,res){
    return res.redirect('/');
   
}