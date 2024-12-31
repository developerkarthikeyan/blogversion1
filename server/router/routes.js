const express = require('express');
const router = express.Router();
const PostModel=require('../model/Savepost');
const { registerUser, Loginuser } = require('../controller/usercontroller');
const { protectedRoute } = require('../controller/protected');
const{CreatePost, uploadHandler }=require("../controller/PostController");
const{singleBlog}=require("../controller/singleBlogdetail");
const{profileuploadHandler,Createprofilehandler}=require("../controller/createprofilecontroller")
const{Homehandler}=require("../controller/homecontroller");
const{getprofileHandler}=require("../controller/GetprofileController")
const{updateprofilehandler}=require("../controller/updateprofilecontroller")
const{profileuploadHandler1}=require("../controller/middleware")
const{deleteUser}=require("../controller/deletecontroller");
const{userblogsHandler}=require("../controller/userblogcontroller")
const{deletebloghandler}=require("../controller/deleteblogcontroller")
const{logoutHandler}=require("../controller/logoutcontroller")
router.post('/signup', registerUser);
router.post('/login', Loginuser);

router.get('/auth', protectedRoute); // Use GET for authentication check
router.post("/createpost",uploadHandler,CreatePost);
router.get("/Tests",Homehandler);
router.post("/createProfile",profileuploadHandler,Createprofilehandler)
router.put("/updateprofile/:id",profileuploadHandler1,updateprofilehandler)
router.delete("/delete/:id",deleteUser);
router.get("/Blogdetails/:id",singleBlog);
router.get("/getprofiledetail/:id",getprofileHandler);
router.post("/blogs",userblogsHandler)
router.delete("/deleteblog/:id",deletebloghandler);
router.get("/logout",logoutHandler);
module.exports = router;
 