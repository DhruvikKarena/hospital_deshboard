const router = require("express").Router();
const Doctor = require("../models/Doctors");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const History = require("../models/History");

//UPDATE

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id ) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
  
      try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
          req.params.id,
          {
            $set: {profilePic: req.body.profilePic,
              email: req.body.email,
              phone_number: req.body.phone_number,
              address: req.body.address,
              doctor_full_name: req.body.doctor_full_name,
              bloode_group: req.body.bloode_group,
              age: req.body.age,
              specilized_in: req.body.specilized_in},

              $push: {doctor_licence: req.body.doctor_licence},
          },
          { new: true }
        );
        res.status(200).json(updatedDoctor);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });

 //GET All history of treated patients 

router.get("/doc-patient-history/:id", verify, async (req, res) => {
  if(req.user.id === req.params.id){
    try {
      const doctor = await Doctor.findById(req.params.id);
      let doc_patient_history = [];
      const history_info = doctor.patient_history; 
      const len = doctor.patient_history.length;
      for(i=len-1;i>=0;i--){
        const temp = await History.findById(history_info[i]);
        if(temp != null){
          doc_patient_history.push(temp);
        }
        else{
          continue;
        }
      }
      res.status(200).json(doc_patient_history);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json("You are not allowed!");
  }  
});

  module.exports = router;