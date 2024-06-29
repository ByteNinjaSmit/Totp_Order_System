const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const { Server } = require('socket.io');
const Order = require('../models/order-model');

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

const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        res.status(200).json({ message: "Contact Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

const getTotp = async (req, res, next) => {
    try {
        res.json({ currentNumber });
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            res.status(404).json({ message: "No Contacts Found" });
        }
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

const order = async (req, res) => {
    try {
        const { totp, username, phone, service, provider, price } = req.body;
        const TOTP = totp;
        const authorizationToken = req.token;

        if (Number(currentNumber) === Number(TOTP)) {
            console.log("It is Correct Data Totp working");
            console.log("It's the same");
            
            const response = await fetch("http://localhost:5000/api/data/service/order/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorizationToken,
                },
                body: JSON.stringify({ username, phone, service, provider, price }),
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

const getAllOrders = async(req,res,next)=>{
    try {
        const orders = await Order.find();
        if(!orders || orders.length ===0){
            return res.status(404).json({message:"No Orders Found"})
        }
        else{
            return res.status(200).json(orders)
        }
    } catch (error) {
        next(error)
    }
};

// -----------------------
// Update Order By Id from Database Dynamically Logic
// -----------------------
const updateOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { complete } = req.body;
        console.log(complete);

        const updateData = await Order.findOneAndUpdate(
            { _id: id },
            { $set: { complete } },
            { new: true } // This option returns the updated document
        );
        if (!updateData) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(updateData);
    } catch (error) {
        next(error);
    }
};




module.exports = { getAllUsers, getAllContacts, deleteUserById, getUsersById, updateUserById, deleteContactById, order, getTotp, generateRandomNumber, getCurrentNumber, startTotpInterval,getAllOrders,updateOrderById };
