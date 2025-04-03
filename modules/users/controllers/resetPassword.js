const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req,res) =>{
    const userModel = mongoose.model("users");

    const {email , new_password ,reset_code } = req.body;

    if(!email) throw "please provide email";
    if(!new_password) throw "please provide new password";
    if(!reset_code) throw "Reset is required";
    if(new_password<5) throw "password length must be greater than 5 characters";

    const getUserResetCode = await userModel.findOne({
        email:email,
        reset_code: reset_code,
    });

    if(!getUserResetCode) throw "Reset code does not match";

const hashedPassword = await bcrypt.hash(new_password,12);

await userModel.updateOne(
    {
        email: email,
    },{
         password: hashedPassword,
         reset_code: "",
    },

    {
        runValidators:true,
    }
)

await emailManager(email,"your password is reseted succcessfully if you not done that contact us!","your password is reseted succcessfully if you not done that contact us!","Password reset successfully");

    res.status(200).json({
        status: "success",
        message: "Password reseted successfully"
    });
};

module.exports = resetPassword;