const mongoose=require("mongoose");
const mongoURL=process.env.mongoURL;

const db=async()=>{
try{
    mongoose.connect(mongoURL)
    console.log("db connection established")
}catch(er){
console.log(er)
}


};

module.exports=db
