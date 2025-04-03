const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwtManager = require("../../../managers/jwtManager");

const emailManager = require("../../../managers/emailManager");

const register = async (req,res) =>{

const userModel = mongoose.model("users");

const {email,password,confirm_password,name,balance} =req.body;


//validations...

if(!email) throw "email must be provided";
if(!password) throw "Password must be provided";
if(password.length<5) throw "Password must be at least 5 characters long";
if(!name) throw "Name is required";
if(password !== confirm_password) throw "Both Passwords should be matched";


const getDuplicateEmail = await userModel.findOne({
    email:email,
})

if(getDuplicateEmail) throw "This email already exists";


const hashedPassword = await bcrypt.hash(password,13);

const createdUser = await userModel.create({
    name:name,
    email:email,
    password:hashedPassword,
    balance:balance,
});

const accessToken = jwtManager(createdUser);




  await emailManager(
    createdUser.email,
    "Welcome to expence tracker PRO. We hope you can manage your expenses easily from our platform",
"<h1>Welcome to expence tracker PRO.</h1><br/> We hope you can manage your expenses easily from our platform",
"Welcome to Expense Tracker Pro",
  );

    res.status(200).json({
        status:"User registered successfully",
        accessToken:accessToken,
    });
};

module.exports = register;