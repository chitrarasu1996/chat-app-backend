const express=require("express");

const { userRegisterController, userLoginController, setAvatarController, getAllUsersController } = require("../controllers/user.controller");

const router=express.Router();

router.post("/user",userRegisterController)


router.post("/login-user",userLoginController)


router.post("/setavatar/:id",setAvatarController)


router.get("/get-allusers/:id",getAllUsersController)

module.exports=router;
