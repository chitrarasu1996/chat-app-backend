const userModel=require("../models/user.model")
const { hashedPass, comparePass } = require("../utils/hashedPassword")
const bcrypt=require("bcrypt")
exports.userRegisterController=async(req,res)=>{

try {
  
    const {userName,email,password}=req.body
   
const oldUserEmail=await userModel.findOne({email})
if(oldUserEmail){
    return res.status(200).send({message:"UserEmail already exits"})

}
const oldUserName=await userModel.findOne({userName})
if(oldUserName){
    return res.status(200).send({message:"UserName already exits"})
}

const hashedPassword=await hashedPass(password);

 const regiteredUser=await new userModel({userName,email,password:hashedPassword}).save()
 regiteredUser.password=""
    if(regiteredUser){

   return res.status(201).send({success:true,message:"user Successfully regitererd",regiteredUser})
}else{
   return res.status(404).send({message:"Error while adding regirtering"})
}

} catch (error) {
    console.log(error)
    res.status(500).send({message:"internal srver error "})
}
    
};

exports.userLoginController=async(req,res)=>{

    try {
        const {userName,password}=req.body;
       
        const foundUser=await userModel.findOne({userName})
       
        if(!foundUser){
            return res.status(200).send({message:"user Doesn't match",success:false})
        }

     
        const validPass=await bcrypt.compare(password,foundUser.password)

        if(!validPass){
    return res.status(200).send({message:"password Doesn't match",success:false} )
}
foundUser.password=""
 res.status(201).send({message:"login User successfully",success:true,foundUser} )

    } catch (error) {
        console.log(error)
    res.status(500).send({message:"internal srver error "})
    }
};


exports.setAvatarController=async(req,res)=>{
    try {
        const {id}=req.params;
        const avatarImage=req.body.image
       const user=await userModel.findByIdAndUpdate(id,{
        inAvatarImageSet:true,
        avatarImage
       })

       if(user){
        res.status(201).send({message:"succefully avatar created",
        isSet:user.inAvatarImageSet,
        image:user.avatarImage
    })
       }
    } catch (error) {
        console.log(error)
    }
};
exports.getAllUsersController=async(req,res)=>{
    try {
        
        const {id}=req.params

        const contact=await userModel.find({_id:{$ne:id}}).select([
    "_id",
    "userName",
    "email",
"avatarImage"
])


        if(contact){
    res.status(200).send({success:true,
        message:"succefully contacts retrived",
        contact})
}
    } catch (error) {
        console.log(error)
    }
}