const PostModel=require('../model/Savepost');

const Homehandler=async(req,res)=>{
   
    const response= await PostModel.find({}).populate("profileid");
 
    const id=response.userid;
    console.log(response);
    
    res.status(200).json(response);
 };
 module.exports={Homehandler}