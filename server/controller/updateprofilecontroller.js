const profilemodel=require("../model/Userprofile")

const updateprofilehandler=async(req,res)=>{
    const{name,currentposition,aboutyou,userid,file,_id,imageURL}=req.body;
    console.log(_id)
console.log(req.body)
let profileimage='' 
if(imageURL){
profileimage=imageURL

} 
else{
    profileimage=req.file.filename

}

const update={
    name,
    currentposition,aboutyou, 
    imageURL:profileimage
 
}
try{
    const options = { new: true, runValidators: true };
    const profile=await profilemodel.findByIdAndUpdate(_id,update,options)
    console.log(profile);
    res.status(201).json(profile)
} 
catch(err){
    console.log(err);
    console.log("not working")
    res.status(500).json({err:err})
}


 }
 module.exports={updateprofilehandler}