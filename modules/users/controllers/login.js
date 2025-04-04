const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req,res) =>{
    const userModel = mongoose.model("users");

    const {email,password} = req.body;


    const getUser = await userModel.findOne({
        email:email,
    });

    if(!getUser) throw "This email does not exist";
   
    const comparePassword = await bcrypt.compare(password,getUser.password);

    if(!comparePassword) throw "Email and password do not match"

    const accessToken = jwtManager(getUser);

//success response
    res.status(200).json({
        status:"success",
        message:"logged in successfully",
        accessToken:accessToken,
    });
};

module.exports = login;