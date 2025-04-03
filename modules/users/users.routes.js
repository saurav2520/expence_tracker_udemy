const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDadhboard");
const auth = require("../../middleware/auth");
const forgetPassword = require("./controllers/forgetPassword");
const resetPassword = require("./controllers/resetPassword");

const userRoutes = express.Router();

//Routes...

userRoutes.post("/register",register);
userRoutes.post("/login", login);
userRoutes.post("/forgetpassword",forgetPassword);
userRoutes.post("/resetpassword",resetPassword);

userRoutes.use(auth);

userRoutes.get("/dashboard",userDashboard);

module.exports = userRoutes;