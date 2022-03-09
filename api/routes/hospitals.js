const router = require("express").Router();
const Hospital = require("../models/Hospitals");
const History = require("../models/History");
//const User = require("../models/Users");
const Doctor = require("../models/Doctors");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

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
        const updatedHospital = await Hospital.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedHospital);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id ) {
      try {
        await Hospital.findByIdAndDelete(req.params.id);
        res.status(200).json("Hospital has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account!");
    }
  });

//GET

router.get("/find/:id", async (req, res) => {
    try {
      const hospital = await Hospital.findById(req.params.id);
      const { password, ...info } = hospital._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL PATIENT HEISTORY
router.get("/findPatientinfo/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id ){
    try {
      const patient_info = await History.find({hospital_id: req.params.id});
      res.status(200).json(patient_info);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json("You are not allowed!");
  }
});

//GET 5 PATIENTs HEISTORY
router.get("/findPatients/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id ){
    try {
      const hospital = await Hospital.findById(req.params.id);
      let length = hospital.patient_info.length;
      let store_info = [];
      //console.log(hospital.patient_info[0]);
      for(i=0;i!=5;i++){
        const temp = await History.findById(hospital.patient_info[length-1-i]);
        if(temp != null){
          store_info.push(temp);
        }
        else{
          continue;
        }
        
      }
      res.status(200).json(store_info);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json("You are not allowed!");
  }
});

//GET ALL PATIENT STATS
router.get("/stats/:id", verify, async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);
  if(req.user.id === req.params.id){
    try {
      const data = await History.aggregate([
        {
          $match: {
            hospital_id: req.params.id
          }
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            //hospital_id: req.params.id,
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json("You are not allowed!");
  }
});

//GET ALL DOCTORS
router.get("/findDoctorinfo/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id ){
    try {
      const hospital = await Hospital.findById(req.params.id);
      let Doctor_info = [];
      for(i=0;i<hospital.doctors_info.length;i++){
        Doctor_info.push(await Doctor.findById(hospital.doctors_info[i])); 
      }
      res.status(200).json(Doctor_info);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json("You are not allowed!");
  }
});

//ADD DOCTOR TO HOSPITAL

router.put("/adddoctor/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id ) {

    try {
      const updatedHospital = await Hospital.findByIdAndUpdate(
        req.params.id,
        {
          $push:  {doctors_info: req.body.doctors_id},
        },
        { new: true }
      );
      res.status(200).json(updatedHospital);
    } catch (err) {
      res.status(500).json(err);
    }

    //add to a current service
    try {
      const updateddoctor = await Doctor.findByIdAndUpdate(
        req.body.doctors_id,
        {
          $set: {current_service_in : req.params.id},
        },
        { new: true }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

//DELETE DOCTOR FROM HOSPITAL

router.put("/deletedoctor/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id ) {

    try {
      const updatedHospital = await Hospital.findByIdAndUpdate(
        req.params.id,
        {
          $pull:  {doctors_info: req.body.doctors_id},
        },
        { new: true }
      );
      res.status(200).json(updatedHospital);
    } catch (err) {
      res.status(500).json(err);
    }

    //add to service_history and delete from current service
    try {
      const updateddoctor = await Doctor.findByIdAndUpdate(
        req.body.doctors_id,
        {
          $push: {service_history: req.params.id},
          $set: {current_service_in : null},
        },
        { new: true }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

module.exports = router;