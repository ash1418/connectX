const Post =  require('../models/post');
// module.exports.home = async function(req,res){
//    // return res.end('<h1>Express is up for Codial</h1>')
//    console.log(req.cookies);
//    //res.cookie('user_id',25)
//    try{
//       const posts= await Post.find({})
//       return res.render('home',{
//          title: "Home",
//          posts: posts
//       })
//    }
//    catch(err)
//    { console.log('err in showing posts')

//    }
// }
   //  Post.find({}

// module.exports.home =function(req,res){
// Post.find({}).populate('user').exec(function(err,posts){
//       if(err)
//       console.log('err in showing posts');
//          return res.render('home', {
//         title: "Home",
//         posts: posts
//    });
//     })
// }
module.exports.home = async function(req, res) {
   try {
      //populate the user of each post
     const posts = await Post.find({}).populate('user').exec();
     res.render('home', {
       title: "Home",
       posts: posts
     });
   } catch (err) {
     console.log('Error in showing posts: ', err);
   }
 }

// const Post = require('../models/post');
// module.exports.home = function(req,res){
//    // return res.end('<h1>Express is up for Codial</h1>')
//    console.log(req.cookies);
//    //res.cookie('user_id',25)
   
//     Post.find({},function(err,posts){
//       if(err)
//       console.log('err in showing posts');
//          return res.render('home', {
//         title: "Home",
//         posts: posts
//    });
//     })

// }
 