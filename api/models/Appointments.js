const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patient_name: { type: String },
    patient_id: { type: String },
    hospitalname: { type: String },
    hospital_id: { type: String },
    doctor_name: { type: String  },
    doctor_id: { type: String },
    time_of_appointment: { type: String },
    previous_history_id: { type: String },
    isold_case: { type: Boolean, default: false },
},
{ timestamps: true },
);

module.exports = mongoose.model("Appointment", AppointmentSchema);