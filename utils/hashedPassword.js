const bcrypt=require("bcrypt")

exports.hashedPass=async(password)=>{

    const saltingRounds=12;
const hashedPassword=await bcrypt.hash(password,12);

return hashedPassword;


}

