const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    patient_name: { type: String },
    patient_id: { type: String },
    hospitalname: { type: String },
    hospital_id: { type: String },
    doctor_name: { type: String  },
    doctor_id: { type: String },
    cause_of_illness: { type: String  },
    medicines: {type: Array},
    description:{ type: String },
    isActive: { type: Boolean, default: false },
    photos_of_reports: {type: Array},
    isAdmitted: { type: Boolean, default: false },
    isOperationNeeded: { type: Boolean, default: false },
    amount: { type: Number,  default: false },
},
{ timestamps: true },
);

module.exports = mongoose.model("History", HistorySchema);