const User = require('../models/user');

module.exports.profile=async function(req,res){
    //res.end('<h1>User Profile</h1>');
    try{
    const user=await User.findById(req.params.id);
    res.render('profile', {
        title: "profile",
        profile_user: user
    })
  }
  catch(err)
  {
    console.log(err);
  }
}

module.exports.update = async function(req,res){
  try{
     if(req.user.id == req.params.id){
      const user = await User.findByIdAndUpdate(req.params.id, req.body); //req.body is sameas {name:req.body.name, email:req.body.email}
      return res.redirect('back');
    }
    else{
      return res.status(401).send('Unauthorized');
    }
    }
    catch(err)
    {
      console.log(err);
    }
}


module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
      return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_up',{
        title: "Codial | Sign up"
    })
  

}

module.exports.signIn= function(req,res){
  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile');
  }
   return res.render('user_sign_in',{
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

module.exports.destroySession = function(req,res,next){
  req.logout((err)=>{
  if(err) return next(err);
  return res.redirect('/');
  }
  );  //inbuilt method in passport 
  
}