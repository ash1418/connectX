const Post =require('../models/post');
const Comment= require('../models/comment');

module.exports.create = async function(req, res){
try{  const post= await Post.create({
    content: req.body.content,  //fetching value of the "content" field submitted in request body
        user: req.user._id  //?
});

    return res.redirect('back');
}
catch(err)
{
    console.log('Error in creating Post'); 
    return;
} 
}
module.exports.destroy = async function(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.redirect("back");
      }
      //using user.id instead of user._id because .id will automattically convert id into string and give in form of string
      if (post.user.toString() !== req.user.id) {
        // console.log(post.user.toString());
        // console.log(req.user.id);
        return res.redirect("back");
      }  //console.log(post);
         //now time to delete this post as we have checked for uthentications
          await Post.deleteOne({_id: req.params.id});
           //need to delete comments also
             //where post is same as req.params.id
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect("back");
    } catch (err) {
      console.error(err);
      return res.redirect("back");
    }
  };
  
// module.exports.destroy =  async function(req,res){
//     try{
//         const post= await Post.findById(req.params.id);
//         //using user.id instead of user._id because .id will automattically convert id into string and give in form of string
//         if(post.user == req.user.id){ //checking useer who is trying to delete is same that has created that post 
//             await post.remove(); //remove post
//              //need to delete comments also
//              //where post is same as req.params.id
//            await Comment.deleteMany({post: req.params.id});
//                return res.redirect('back');
//             };
//         }
//     catch(err)
//     { 
//         return res.redirect('back');
//       console.log(err);

//     }
//     }
    
