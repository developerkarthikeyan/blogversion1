const User=require("../model/usermodel");
const bycrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const registerUser=async(req,res)=>{
    const{username,email,password}=req.body;
    const Userexits= await User.findOne({email});
    if(Userexits){
          return res.status(409).json({error:"email already exists"});
    }
    try{
       
        const salt=await bycrypt.genSalt(10)
        const hashPassword=await bycrypt.hash(password,salt)
        const newUser=new User({
            username,email,
            password:hashPassword
        })
        await newUser.save();
        console.log(newUser)
    const token = jwt.sign({ id:newUser._id },process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    res.status(200).json({
        token,
        name:newUser.name,
        email:newUser.email  
    })

    }catch(error){
        if(error.code==11000){
            return res.status(400).json({error:"username already exists"});

        }
    }
}
   


const Loginuser=async(req,res)=>{
    const{email,password}=req.body;  
    console.log(req.body)
    const userexsists= await User.findOne({email});
    if(!userexsists){
    console.log("user does not exists");

        return res.status(404).json({message:"User does not exsists"});
    }
    const ismatch=await bycrypt.compare(password,userexsists.password);

    if(!ismatch){
        console.log("incorrect password");
        return res.status(401).json({error:"incorrect password"})
 
     }
    const token = jwt.sign({ id:userexsists._id },process.env.JWT_SECRET,{ expiresIn: '2d' });
console.log(token);

res.cookie('token', token, {

    expires:new Date(Date.now()+90+90*24*60*60*1000),
    httpsOnly:true,
    secure:true
     // Makes the cookie inaccessible to JavaScript on the client side
})
res.status(200).json({userexsists,token});

}


module.exports={registerUser,Loginuser};




