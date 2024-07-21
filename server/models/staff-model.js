const { Schema, model } = require("mongoose");

const staffMemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false  // Make this field optional
    },
    role: {
        type: String,
        required: true
    },
    mobile: {
        type: String,  // Change to String if the mobile number includes a country code
        required: true
    },
    work: {
        type: Boolean,
        default: true
    }
});

const Staff = model("Staff", staffMemberSchema);
module.exports = Staff;
