const { Schema, modal, default: mongoose, model } = require("mongoose");

const orderSchema = new Schema(
    {
        products: [{
            type: mongoose.ObjectId,
            ref: "Product",
        },
        ],
        payment: {

        },
        buyer: {
            type: mongoose.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "Deliverd", "Cancel"],
        },

    },
    { timestamps: true }
);


//  Create a model or collection

const Order = new model("Order", orderSchema);

module.exports = Order;