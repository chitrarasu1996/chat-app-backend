require("dotenv").config();

const cors=require("cors")

const express=require("express");
const db = require("./db/connect");
const app=express();
const userRoutes=require("./routes/user.routes")
const messageRoutes=require("./routes/messagesRoutes")
const socket=require("socket.io");

///middlewars
app.use(express.json())
app.use(cors())

const port=4000;
db()
app.use("/auth",userRoutes)
app.use("/msg",messageRoutes)
app.get("/",(req,res)=>{
    res.status(200).send({message:"chat-app"})
  })

  const server=app.listen(port,()=>{
    console.log("port is running ",port)
  })
  const io=socket(server,{
    cors:{
      origin:"https://chattify-app.netlify.app",
      credentials: true,
     
    }
  });

  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    global.chatSocket = socket; 
    socket.on("add-user", (userId) => {
  onlineUsers.set(userId, socket.id)
    })
  
    socket.on("send-msg",(data) => {
 const sendUserSocket = onlineUsers.get(data.to)


if(sendUserSocket){
  socket.to(sendUserSocket).emit("msg-recieve",data.messages)

}
})

  })
  

