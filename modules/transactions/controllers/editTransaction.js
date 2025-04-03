const mongoose = require("mongoose");
const validator = require("validator");


const editTransaction = async (req, res) => {

    const transactionModel = mongoose.model("transaction");

    const { transaction_id, remarks, amount, transaction_type } = req.body;

    if (!transaction_id) throw "Transaction id is required";
    if (!validator.isMongoId(transaction_id.toString())) throw "Please provide the valid id";

    const getTransaction = await transactionModel.findOne({
        _id: transaction_id
    })

    if (!getTransaction) throw "Transaction not found";

    if(transaction_type!== "income" && transaction_type !== "expence") throw "Transaction type must be income or expense only"

    await transactionModel.updateOne({
        _id: transaction_id,
    }, {
        remarks,
        transaction_type,
        amount,
    }, {
        runValidators: true
    });

    res.status(200).json({
        status: "Edit transaction",
    });

};

module.exports = editTransaction;