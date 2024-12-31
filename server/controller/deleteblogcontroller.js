const blogmodel=require("../model/Savepost")

const deletebloghandler =async(req,res)=>{
    const _id=req.params.id
console.log(_id) 
try{
    const response=await blogmodel.deleteOne({_id});
    res.status(200).json({message:"Sucessfully Deleted"})
console.log("delete succesfully")
}catch(err){
console.log(err)
res.status(500).json({message:"server error"});
}

}
module.exports={deletebloghandler}