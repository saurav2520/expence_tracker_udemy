const mongoose = require("mongoose");

const emailManager = require("../../../managers/emailManager");


const forgetPassword =async (req,res)=>{

    const userModel = mongoose.model("users");
    
const {email} = req.body;

if(!email) throw "Email is required";

const getUser = await userModel.findOne({
    email:email,
})

if(!getUser) throw "This email doesn't exist in the system";

const resetCode = Math.floor(10000 + Math.random() * 90000);

await userModel.updateOne(
    {
        email:email,
    },
    {
        reset_code: resetCode,
    },
    {
        runValidators: true,
    }
)



await emailManager(email,"Your reset password code is "+resetCode,"Your reset password code is "+resetCode,"Reset your password")


    res.status(200).json({
        status:"Reset code send to your email id",
    });
};

module.exports= forgetPassword;