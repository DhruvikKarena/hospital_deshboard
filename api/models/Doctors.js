const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    doctor_full_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    age: { type: Number},
    bloode_group: { type: String},
    profilePic: { type: String, defaut: "" },
    phone_number: { type: Number},
    address: { type: String},
    patient_history: { type: Array },
    medical_history: {type: Array},
    date_of_birth: { type: String},
    isDoctor: { type: Boolean, default: true },
    doctor_licence: {type: Array},
    specilized_in: { type: String},
    current_service_in: { type: String},
    service_history: { type: Array},
},
{ timestamps: true },
);

module.exports = mongoose.model("Doctor", DoctorSchema);