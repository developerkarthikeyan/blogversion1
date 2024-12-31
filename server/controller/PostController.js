const multer = require('multer');
const path=require('path');
const fs = require('fs');
const savePost=require('../model/Savepost');
const profile=require("../model/Userprofile");
const uploadDir = path.join(__dirname,'uploads');
console.log(uploadDir)
// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

// Configure multer 
const upload = multer({
    storage: storage,
});

// Route level middleware - use upload middleware before the controller
const uploadHandler = upload.single('file');

// Controller to handle post creation


async function CreatePost(req, res) {
    try { 

    const {title,content,name,userid,profileid,imageURL} = req.body;
        console.log(title,content,req._id);
        console.log(req.body);
        console.log(userid);
const newBlog=await savePost.create({
    title,
    content,
    name,
    userid,
    profileid,
    imageURL

});

        // Ensure file has been uploaded
   
        await profile.updateOne(
            { _id: profileid }, // Find the profile by profileid
            { $push: { userpost: newBlog._id } } // Push the new post ID into the array
        );

        // Log the received data (title, content, and file info)
        console.log('Title:', title);
        console.log('Content:', content);
                // console.log('File:', req.file);
                const populatedPost = await savePost.findById(newBlog._id).populate("profileid")

console.log("hi",populatedPost);


        // Further logic to store the post in your database can go here
        res.status(201).json(populatedPost)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create post", error });
    }
}

module.exports = { CreatePost, uploadHandler };
