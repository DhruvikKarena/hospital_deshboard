const router = require("express").Router();
const Hospital = require("../models/Hospitals");
const History = require("../models/History");
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
            $set: {profilePic: req.body.profilePic,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address}
          },
          { new: true }
        );
        const { password, ...info } = updatedHospital._doc;
        res.status(200).json({...info});
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

//GET ALL
router.get("/allHospitals", verify, async (req, res) => {
    try {
      const hospitals = await Hospital.find();
      const query = req.query;
      let all_hospital = [];
      const pos = { lat: Number(query.lat)-1, lng: Number(query.lng)-1 };
      let temp = [];
      let distance;
      let longitude, latitude;
      for(i=0;i<hospitals.length;i++){
        const { password,appointments,cancel_appointments, ...info } = hospitals[i]._doc;
        latitude = Number(info.location[0].toFixed(8));
        longitude = Number(info.location[1].toFixed(8));
        distance=Math.sqrt(Math.pow((pos.lat - latitude),2) + Math.pow((pos.lng - longitude), 2));
        distance = distance.toFixed(4);
        temp.push(info);
        temp.push(Number(distance));
        all_hospital.push(temp);
        temp=[];
      }
      all_hospital.sort(function(a,b) {
        return a[1]-b[1]
      });
      res.status(200).json(all_hospital);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;