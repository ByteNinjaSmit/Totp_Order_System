const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const { Server } = require('socket.io');

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
        console.log("TOTP:", TOTP);
        console.log("Username:", username);
        console.log("Phone:", phone);
        console.log("Service:", service);
        console.log("Provider:", provider);
        console.log("Price:", price);

        if (currentNumber === TOTP) {
            console.log("It is Correct Data Totp working");
            console.log("its Same");
        } else {
            console.log("is Not Same");
            console.log(`Current Number is ${currentNumber}  and TOTP is: ${TOTP}`);
        }
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUsersById, updateUserById, deleteContactById, order, getTotp, generateRandomNumber, getCurrentNumber, startTotpInterval };
