const Service = require("../models/service-model");
const User = require('../models/user-model');

const services =  async (req,res) => {
    try{
        const response = await Service.find();
        
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

const OrderData = async (req,res,next) =>{
    try {
        const serviceId = req.params.id;
        const data = await Service.findOne({_id:serviceId});
        console.log(data);
        return res.status(200).json(data)
    } catch (error) {
        console.log(`Order Data error : ${error}`);   
        next(error);
    }
};

module.exports = {services,OrderData};