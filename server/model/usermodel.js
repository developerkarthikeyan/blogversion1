const mongoose=require("mongoose")
const Userschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true}
, 
})
const usermodel=mongoose.model("User",Userschema);
module.exports=usermodel;