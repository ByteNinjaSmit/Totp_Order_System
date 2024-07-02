const { Schema, model, default: mongoose } = require("mongoose");

const orderProductSchema = new Schema({
    service: {
        type: mongoose.ObjectId,
        ref: "Service", // Reference the Service model
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    vegetarian: {
        type: Boolean,
        default: false
    },
    image: { 
        type: String,
        required:true
    }, 
    ingredients: [String],
    quantity: {
        type: Number,
        required: true,
    },
});

const orderSchema = new Schema(
    {
        products: [orderProductSchema],
        paymentMethod: {
            type: String,
            required: true,
        },
        tableNo: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            required: true,
        },
        buyer: {
            type: mongoose.ObjectId,
            ref: "Users", // Reference the User model
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "Delivered", "Cancel"],
        },
    },
    { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
