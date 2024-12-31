const usermodel=require("../model/Savepost");

const userblogsHandler=async(req,res)=>{
console.log(req.body)
const userid=req.body
try{
    const response=await usermodel.find({_id:{$in:userid}});
res.status(200).json(response)
    console.log(response.title);
}catch(err){
console.log(err);
}

}
module.exports={userblogsHandler}