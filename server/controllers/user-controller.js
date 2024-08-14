const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const Order = require('../models/order-model');

const getOrdersByUser = async (req, res, next) => {
    try {
        // Correctly retrieve the ID from route parameters
        const id = req.params.id;

        // Find orders based on buyer's ID
        const data = await Order.find({ buyer: id }).populate("buyer","-password").sort({createdAt:-1});

        // Respond with the found data
        return res.status(200).json(data);
    } catch (error) {
        // Log the error before passing it to the error handler
        console.error(`User Order Error: ${error.message}`);
        next(error);
    }
};

// get SIngle Order Detail 
const getSingleOrder= async (req,res,next)=>{
    try {
        const id = req.params.id;
        const order = req.params.order;
        const data = await Order.findById({_id: order}).populate("buyer","-password");
        return res.status(200).json(data);
    } catch (error) {
        console.error(`User Single Order Error: ${error.message}`);
        next(error);
    }
}


module.exports = {
    getOrdersByUser,
    getSingleOrder,
 };