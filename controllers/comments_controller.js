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



