const createprofile=require("../model/Userprofile");
const userblog=require('../model/Savepost');
const multer = require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,"./public/UserProfile/");
    
},
    filename:(req,file,cb)=>{
    cb(null, Date.now() + '-' + file.originalname); // Unique file name

    }  
});
// Configure multer 
const upload = multer({
    storage: storage,
});

// Route level middleware - use upload middleware before the controller
const profileuploadHandler = upload.single('file');
  

const Createprofilehandler=async(req,res)=>{
const{name,position,aboutyou,userid,imageURL}=req.body;
console.log(req.body)
let isimageURL;
if(imageURL){
    isimageURL=imageURL;
    console.log("no image");
}

else{
    imageURL= "noimage";
console.log("elsepart")
    
}

try{
    

    const Newprofile=await createprofile.create({
        name,
        currentposition:position,
        aboutyou,
        userid:userid,
        imageURL:isimageURL
    });


    console.log(Newprofile);
   return res.status(200).json(Newprofile);

}catch(err){
res.status(400).json({message:"sever errror"});
console.log(err)
}


}
module.exports={Createprofilehandler,profileuploadHandler}