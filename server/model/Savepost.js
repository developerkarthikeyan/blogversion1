const mongoose =require('mongoose');

// Define the Post schema
const Save_schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    name: { type: String, required: true },
    imageURL:{type: String, required: true },
    userid:{
        type:mongoose.Schema.Types.ObjectId, // Reference to Profile schema  // Referring to the userid in the Profile schema
        required: true,
     }, 
     profileid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Userrofile',
    required:true
    }
,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const savePost = mongoose.model('User_blog', Save_schema);
module.exports = savePost;
