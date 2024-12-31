const profielmodel=require("../model/Userprofile")
const postmodel=require('../model/Savepost')
const getprofileHandler=async(req,res)=>{
    const id=req.params.id;
    console.log("profileid",id)
try{

    const userProfile= await profielmodel.findOne({_id:id});

    console.log(userProfile)
    const post=userProfile.userpost;
const userpost=await postmodel.find({_id:{$in:post}})

console.log(userProfile);
res.status(200).json({userProfile,userpost});

}catch(err){
    console.log(err);
    res.status(400).json({message:"server error"});
}
}
module.exports={getprofileHandler}