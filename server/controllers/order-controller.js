const Order = require("../models/order-model");
const OrderForm=async(req,res)=>{
    try {
        const response=req.body
        await Order.create(response);
        return res.status(200).json({message:"Order send successfully"});
    } catch (error) {
        return res.status(500).json({message:"Order Not delivered"});
    }
};

module.exports=OrderForm;