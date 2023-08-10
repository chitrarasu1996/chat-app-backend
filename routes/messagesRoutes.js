const express=require("express");
const { sendMessage, addMessage, getAllMessage, chekingmsg } = require("../controllers/messagesController");

const router=express.Router();

router.post("/sendmessage",addMessage)
router.post("/allmessages",getAllMessage)

module.exports=router
