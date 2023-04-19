const Post =require('../models/post');


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
