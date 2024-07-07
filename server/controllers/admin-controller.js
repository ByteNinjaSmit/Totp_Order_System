const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const Order = require('../models/order-model');
const Service = require("../models/service-model");

// -------------------
// Generating a ranodm Number
// =----------------------------

let currentNumber;

// Function to generate a 6-digit random number
function generateRandomNumber() {
    currentNumber = Math.floor(100000 + Math.random() * 900000);
}
function getCurrentNumber() {
    return currentNumber;
}

// Function to start TOTP generation and emit updates
function startTotpInterval(io) {
    generateRandomNumber();
    io.emit('newNumber', getCurrentNumber());

    setInterval(() => {
        generateRandomNumber();
        io.emit('newNumber', getCurrentNumber());
    }, 30000); // Emit every 30 seconds

    // Broadcast new numbers every second
    setInterval(() => {
        io.emit('newNumber', getCurrentNumber());
    }, 1000); // Broadcast every 1 second
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 }).exec();
        if (!users || users.length === 0) {
            res.status(404).json({ message: "No users Found" });
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        next(error);
    }
};

const getUsersById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, {
            $set: updateUserData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "user Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

//  Contact Login Get All Contacts and Delete Contacs
// also broadCast Data Every Seconds
async function startContactBroadcast(io) {
    setInterval(async () => {
        try {
            const contacts = await Contact.find();
            io.emit('contactData', contacts);
        } catch (error) {
            console.error('Error broadcasting Contacts:', error);
        }
    }, 1000);
};
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            res.status(404).json({ message: "No Contacts Found" });
        } else {
            res.status(200).json(contacts);
        }
    } catch (error) {
        next(error);
    }
};

const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact Deleted Successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        next(error); // Pass the error to the error handling middleware
    }
};



const getTotp = async (req, res, next) => {
    try {
        res.json({ currentNumber });
    } catch (error) {
        next(error);
    }
};

// Sending Order

const order = async (req, res) => {
    try {
        const { totp, cart, paymentMethod, paymentStatus, tableNo } = req.body;
        const TOTP = totp;
        const authorizationToken = req.token;
        const id = req.params.id;

        if (Number(currentNumber) === Number(TOTP)) {
            console.log("It is Correct Data Totp working");
            console.log("It's the same");

            const response = await fetch(`http://localhost:5000/api/data/service/${id}/order/data`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorizationToken,
                },
                body: JSON.stringify(
                    {
                        products: cart,
                        paymentMethod: paymentMethod,
                        paymentStatus: paymentStatus,
                        tableNo: tableNo,
                        buyer: id,

                    }
                ),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log("Order placed successfully:", responseData);
            return res.status(200).json(responseData);
        } else {
            return res.status(400).json({ message: "Invalid TOTP" });
        }
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// -----------------------
// Get all Orders Data From Database Dynamically Logic
// -----------------------
// Broadcast This every Second Using Socket io
async function startOrderBroadcast(io) {
    setInterval(async () => {
        try {
            const orders = await Order
                .find({})
                .populate("buyer", "-password")
                .populate("products")
                .sort({ createdAt: -1 }); // Sort by createdAt field in descending order
            io.emit('orderData', orders);
        } catch (error) {
            console.error('Error broadcasting orders:', error);
        }
    }, 900);
};

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order
            .find({})
            .populate("buyer", "-password")
            .populate("products")
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
};

// UpdateOrder
const updateOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { status, paymentStatus } = req.body;

        const updateData = await Order.findOneAndUpdate(
            { _id: id },
            { $set: { status, paymentStatus } },

        );
        if (!updateData) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(updateData);
    } catch (error) {
        next(error);
    }
};

// -----------------------
// Delete Order By Id from Database Dynamically Logic
// -----------------------
const deleteOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Order.deleteOne({ _id: id });
        return res.status(200).json({ message: "order Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

// Get Order By id 
const getOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Order.findOne({ _id: id })
            .populate("buyer", "-password");
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

// Get Single Services
const getSingleServiceById =  async (req,res) => {
    try{
        const id = req.params.id;
        const data = await Service.findOne({ _id: id });
        res.status(200).json(data);
    }catch(error){
        console.log(`services: ${error}`);
    }

};

// Update Service By Id
const updateServiceById =  async (req,res) => {
    try{
        const id = req.params.id;
        const response = await Service.findByIdAndUpdate(id, req.body, {new: true});
        if(!response){
            // Handle the Casse where no Document was Found
            res.status(404).json({msg:"No Service Found."});
            return;
        }
        res.status(200).json({msg: response});
    }catch(error){
        console.log(`services: ${error}`);
    }

};

// New Service Post
const ServiceForm=async(req,res)=>{
    try {
        const response=req.body
        await Service.create(response);
        return res.status(200).json({message:"Service Added successfully"});
    } catch (error) {
        return res.status(500).json({message:"Service Not Added successfully"});
    }
};

// Delete Service By ID

const deleteServiceById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.deleteOne({ _id: id });
        return res.status(200).json({ message: "Service Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllUsers,
    getAllContacts,
    deleteUserById,
    getUsersById,
    updateUserById,
    deleteContactById,
    order,
    getTotp,
    generateRandomNumber,
    getCurrentNumber,
    startTotpInterval,
    getAllOrders,
    updateOrderById,
    startOrderBroadcast,
    deleteOrderById,
    startContactBroadcast,
    getOrderById,
    getSingleServiceById,
    updateServiceById,
    ServiceForm,
    deleteServiceById,
};