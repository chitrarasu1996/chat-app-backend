
const messageModel=require("../models/messageSchema");


exports.addMessage=async(req,res)=>{
    try {
    const   {from,to,messages}=req.body

const storedMsg=await new messageModel({
 message:{ 
        text:messages
    },
    users:[from,to],
    sender:from
}).save();

if(storedMsg){
    return res.status(201).send({success:true,
        message:"message added successfully"})
}
 res.status(404).send({message:"error while adding message"})

    } catch (error) {
        console.log(error)

    }
}

exports.getAllMessage=async(req,res)=>{
    try {

const {from,to}=req.body

        const messages=await messageModel.find({users:{$all:[from,to]}})
        .sort({updatedAt:1})
    
        
const projectMessage=messages.map((msg)=>{
    return{
        sender:msg.sender==from,
        msg:msg.message.text
    }
})


res.status(200).send({message:"suucefully got mesagess",projectMessage})
    } catch (error) {
        console.log(error)

    }
}

