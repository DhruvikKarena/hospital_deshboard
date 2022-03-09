const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    hospitalname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    phone_number: { type: Number, required: true },
    address: { type: String },
    total_bed: { type: Number, required: true },
    vacant_bed: { type: Number, required: true },
    patient_info: { type: Array },
    doctors_info: { type: Array }, 
    location: {type: Array},
    isHospital: { type: Boolean, default: true },
    hospital_licence: {type: Array},
    appointments: { type: Array },
    cancel_appointments: { type: Array },
},
{ timestamps: true },
);

module.exports = mongoose.model("Hospital", HospitalSchema);