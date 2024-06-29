const { Schema, modal, default: mongoose, model } = require("mongoose");

const orderSchema = new Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    provider: { type: String, required: true },
    price: { type: String, required: true },
    complete: { type: Boolean, default: false },
});


//  Create a model or collection

const Order = new model("Order", orderSchema);

module.exports = Order;