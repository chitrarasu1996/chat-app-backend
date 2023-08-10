const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        min:3,
        max:20,
        unique:true,
        required:true
    },
    email:{
type:String,
unique:true,
max:20,
required:true

    },
    password:{
        type:String,
        required:true,
        min:8
    },
  
    inAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
});

module.exports=mongoose.model("user",userSchema)