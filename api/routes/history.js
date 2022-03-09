const router = require("express").Router();
const History = require("../models/History");
const verify = require("../verifyToken");
const User = require("../models/Users");
const Hospital = require("../models/Hospitals");
const Doctor = require("../models/Doctors");

//CREATE

router.post("/", verify, async (req, res) => {
    if (req.user.isDoctor || req.user.isHospital) {
      const newHistory = new History(req.body);
      try {
        const savedHistory = await newHistory.save();
        res.status(201).json(savedHistory);
        const history = await History.find().sort({ _id: -1 }).limit(1);
        if(history != null){
          //update user medical history
          try {
            const updatedUser = await User.findByIdAndUpdate(
              history[0].patient_id,
              {
                $push : {medical_history: history[0]._id.toString()},
              },
              { new: true }
            );
          } catch (err) {
            res.status(500).json(err);
          }

          //update hospital patient information
          if(req.body.isAdmitted === "true"){
            //console.log(req.body.isAdmitted + req.body.vacant_beds );
            try {
              const updatedhospital = await Hospital.findByIdAndUpdate(
                history[0].hospital_id,
                {
                  $push : {patient_info: history[0]._id.toString()},
                    $set: {vacant_bed: req.body.vacant_beds - 1 }           
                },
                { new: true }
              );
            } catch (err) {
              res.status(500).json(err);
            }
          }
          else{
            try {
              const updatedhospital = await Hospital.findByIdAndUpdate(
                history[0].hospital_id,
                {
                  $push : {patient_info: history[0]._id.toString()},         
                },
                { new: true }
              );
            } catch (err) {
              res.status(500).json(err);
            }
          }
          

          //update doctor patient information

          try {
            const updateddoctor = await Doctor.findByIdAndUpdate(
              history[0].doctor_id,
              {
                $push : {patient_history: history[0]._id.toString()},
              },
              { new: true }
            );
          } catch (err) {
            res.status(500).json(err);
          }
        }
        else{
          console.log("history not found")
        }
        
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });


//UPDATE

router.put("/:id", verify, async (req, res) => {
  //console.log(req.body);
  if (req.user.isDoctor || req.user.isHospital) {
    try {
      const updatedHistory = await History.findByIdAndUpdate(
        req.params.id,
        {
          // $set: req.body
          $set: {amount: req.body.amount,
            cause_of_illness: req.body.cause_of_illness,
            description: req.body.description,
            isActive: req.body.isActive,
            isAdmitted: req.body.isAdmitted,
            isOperationNeeded: req.body.isOperationNeeded},
          $push: {medicines: req.body.medicines},
        },
        { new: true }
      );
      //res.status(200).json(updatedHistory);
      //console.log(req.body);
      if(req.body.isAdmitted === "false"){
        //let value = req.body.vacant_beds - parseInt(1) ;
        //console.log(value);
        const temp = await Hospital.findByIdAndUpdate(
          req.body.hospital_id,
          {
            // $set: req.body
            $set: {vacant_bed: req.body.vacant_beds + 1 }
          },
          { new: true }
        );
      }
      //res.status(200).json(updatedHistory);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isDoctor || req.user.isHospital) {
    const history = await History.findById(req.params.id);
      //console.log(history);
      if(history != null){
        //delete from user medical history
        try {
          const updatedUser = await User.findByIdAndUpdate(
            history.patient_id,
            {
              $pull : {medical_history: history._id.toString()},
            },
            { new: true }
          );
        } catch (err) {
          res.status(500).json(err);
        }

        //delete from hospital patient information

        try {
          const updatedhospital = await Hospital.findByIdAndUpdate(
            history.hospital_id,
            {
              $pull : {patient_info: history._id.toString()},
            },
            { new: true }
          );
        } catch (err) {
          res.status(500).json(err);
        }

        //delete from doctor patient information

        try {
          const updateddoctor = await Doctor.findByIdAndUpdate(
            history.doctor_id,
            {
              $pull : {patient_history: history._id.toString()},
            },
            { new: true }
          );
        } catch (err) {
          res.status(500).json(err);
        }
      }
      else{
        console.log("history not found")
      }
    try {
      await History.findByIdAndDelete(req.params.id);
      res.status(200).json("The history has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});


//GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;

  