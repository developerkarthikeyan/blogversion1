const PostModel=require("../model/Savepost");
const profielmodel=require("../model/Userprofile")
async function singleBlog(req,res){
    const id=req.params.id;
    console.log(id);
    console.log("request from navbar");
    
    
    try{
        const User=await PostModel.findById({_id:id}).populate("profileid");
    
       console.log(User._id)
    //    const {userid}=User;
    //    const userdetails=await profielmodel.find({userid});
    //    console.log(userdetails)
        console.log(User);
            res.status(200).json(User);
        
    }catch(err){
res.status(400).json({messaage:"internal server error"})
console.log(err)
    }
  
    
}

module.exports={singleBlog}