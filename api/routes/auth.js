const router = require("express").Router();
const User = require("../models/Users");
const Hospital = require("../models/Hospitals");
const Doctor = require("../models/Doctors");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      full_name: req.body.full_name,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),       
    });
    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
});

//REGISTER FOR DOCTOR
router.post("/registerdoctor", async (req, res) => {
  const newDoctor = new Doctor({
    username: req.body.username,
    email: req.body.email,
    doctor_full_name: req.body.doctor_full_name,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),       
  });
  try {
    const doctor = await newDoctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//REGISTER FOR HOSPITAL
router.post("/registerHospital", async (req, res) => {
  const newHospital = new Hospital({
    hospitalname: req.body.hospitalname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),  
    phone_number: parseInt(req.body.phone_number),
    total_bed: parseInt(req.body.total_bed),
    vacant_bed: parseInt(req.body.vacant_bed),     
  });
  try {
    const hospital = await newHospital.save();
    res.status(201).json(hospital);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
     res.status(401).json("Wrong password or username!");

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
  
    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN FOR DOCTOR
router.post("/loginDoctor", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });
    !doctor && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(doctor.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
     res.status(401).json("Wrong password or username!");

    const accessToken = jwt.sign(
      { id: doctor._id, isDoctor: doctor.isDoctor },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = doctor._doc;
  
    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN FOR HOSPITAL
router.post("/loginHospital", async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ email: req.body.email });
    !hospital && res.status(401).json("Wrong password or hospitalname!");

    const bytes = CryptoJS.AES.decrypt(hospital.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
     res.status(401).json("Wrong password or hospitalname!");

    const accessToken = jwt.sign(
      { id: hospital._id, isHospital: hospital.isHospital },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = hospital._doc;
  
    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
