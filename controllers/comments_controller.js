const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post);

        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            //now we ned to add this comment id to the post
            post.comments.push(comment);
            await post.save(); // whenever we update something we need to save it
            // telling db this is the final version so block it save it
            // once it is in memory that is ram but after using post.save it is saving in db
            res.redirect('/');
        }
    } catch (err) {
        // handle error
        console.log(err);
        res.status(500).send('An error occured');
    }

}
// module.exports.destroy= async function(req,res){
//   try{
//     const comment = await Comment.findById(req.params.id);
//         if(comment.user==req.user.id){
//            let postId = comment.post; //we need to first save the ifd of post before deleteing comment because we need to delete the comment from post's comments array also
           
//           await  Comment.deleteOne({_id : req.params.id});

//           await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id }})
            
//            //find postId in post and pull req.params.id's comment from comments 
//         }
//     }
//     catch(err){
//         console.log(err);
//         return res.redirect('back');
//     }
//}
module.exports.destroy = async function(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.user == req.user.id) {
        const postId = comment.post; //we need to first save the ifd of post before deleteing comment because we need to delete the comment from post's comments array also
        await  Comment.deleteOne({_id : req.params.id});
        const post = await Post.findByIdAndUpdate(
          postId,
          { $pull: { comments: req.params.id } }, //find postId in post and pull req.params.id's comment from comments 
          { new: true } //If you don't use the new option when updating the post, the findByIdAndUpdate() method will return the old document instead of the updated one. This means that the post variable in the code will contain the old post document, which might not reflect the latest changes to the comments array.
        );
        return res.redirect('back');
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// module.exports.destroy= function(req,res){
//     Comment.findById(req.params.id, function(err,comment){
//         if(comment.user==req.user.id){
//            let postId = comment.post; //we need to first save the ifd of post before deleteing comment because we need to delete the comment from post's comments array also
           
//            comment.remove();

//            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id }}, function(err,post){
//             return res.redirect('back');
//            }) //find postId in post and pull req.params.id's comment from comments 
//         }
//     })
// }



