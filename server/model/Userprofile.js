const mongoose=require("mongoose")
const ProfileSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    currentposition:{type:String,required:true},
    aboutyou:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId,
        ref:"User_blog",
        required:true},
    imageURL:{type:String},
  userpost:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User_blog",
        required:true
    }
  ]
});
const createprofilemodel=mongoose.model("Userrofile",ProfileSchema);
module.exports=createprofilemodel;
