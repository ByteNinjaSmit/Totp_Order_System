const { Schema, model} = require("mongoose");

const tableSchema = new Schema(
    {
        tableEngage:{
            type: Boolean,
            default: false,
        },
        tableNo: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Table = model("Table", tableSchema);

module.exports = Table;