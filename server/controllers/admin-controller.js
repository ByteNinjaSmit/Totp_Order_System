const User = require('../models/user-model');
const Contact = require('../models/contact-model');

//  TOTP
let currentNumber;

// Function to generate a 6-digit random number
function generateRandomNumber() {
    currentNumber = Math.floor(100000 + Math.random() * 900000);
}

// Generate the initial random number
generateRandomNumber();

// Update the random number every 30 seconds
setInterval(generateRandomNumber, 30000);




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
// Single User Data get Logic

const getUsersById = async (req,res, next)=>{
    try {
       const id =req.params.id;
       const data = await User.findOne({_id:id},{password:0});
       return res.status(200).json(data);
    } catch (error) {
       next(error);
    }
}

// Update User Data Logic

const updateUserById =async(req,res, next)=>{
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne({_id:id},{
            $set: updateUserData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

// Delete User Login

const deleteUserById = async (req,res, next)=>{
     try {
        const id =req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"user Deleted Successfully"});
     } catch (error) {
        next(error);
     }
}


// delete Contact Logic

const deleteContactById = async (req,res, next)=>{
    try {
       const id =req.params.id;
       await Contact.deleteOne({_id:id});
       res.status(200).json({message:"Contact Deleted Successfully"});
    } catch (error) {
       next(error);
    }
};

const getAllContacts = async (req,res, next)=>{
    try {
        const contacts= await Contact.find();
        if(!contacts || contacts.length === 0){
            res.status(404).json({message:"No Contacts Found"});
        }
        res.status(200).json(contacts);

    } catch (error) {
        next(error);
    }
}


// Genrate TOTP Logic

const getTotp = async (req, res, next) => {
    try {
        res.json({ currentNumber });
    } catch (error) {
        next(error);
    }
};



module.exports={getAllUsers,getAllContacts,deleteUserById,getUsersById,updateUserById,deleteContactById,getTotp};