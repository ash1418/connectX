const mongoose= require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'  //refer to User schema
    },
    //include the array of ids of all comments in this post schema itself
    //fetch all comments of a post as soon as the post is loaded so we will put this in array so our query will be fast 
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;