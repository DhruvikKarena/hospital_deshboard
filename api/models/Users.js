const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    full_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    age: { type: Number},
    bloode_group: { type: String},
    profilePic: { type: String, defaut: "" },
    phone_number: { type: Number},
    address: { type: String},
    medical_history: {type: Array},
    date_of_birth: { type: String},
    appointment: { type: Array},
},
{ timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);