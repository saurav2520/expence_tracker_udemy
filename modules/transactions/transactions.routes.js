const express = require("express");
const addIncome = require("./controllers/addIncome");
const auth = require("../../middleware/auth");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");
const transactionRoutes = express.Router();

//Routes...

transactionRoutes.use(auth);

//protected routes

transactionRoutes.post("/addincome",addIncome);
transactionRoutes.post("/addexpense",addExpense);
transactionRoutes.get("/",getTransactions);
transactionRoutes.patch("/",editTransaction);

transactionRoutes.delete("/:transaction_id",deleteTransaction);

module.exports = transactionRoutes;