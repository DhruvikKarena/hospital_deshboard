const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const History = require("../models/History");

//UPDATE

router.put("/:id", verify, async (req, res) => {
  // console.log(req.body);
    if (req.user.id === req.params.id ) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {profilePic: req.body.profilePic,
              email: req.body.email,
              phone_number: req.body.phone_number,
              address: req.body.address,
              full_name: req.body.full_name,
              bloode_group: req.body.bloode_group,
              age: req.body.age},
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
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
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
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
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All history of 1 patient

router.get("/findhistory/:id", verify, async (req, res) => {
  //  console.log("body= ",req.body);
  // console.log("p= ",req.params.id);
  if(req.user.id === req.params.id){
    try {
      const user = await User.findById(req.params.id);
      let patient_history = [];
      const history_info = user.medical_history; 
      const len = user.medical_history.length;
      for(i=0;i<len;i++){
        const temp = await History.findById(history_info[i]);
        if(temp != null){
          patient_history.push(temp);
        }
        else{
          continue;
        }
      }
      res.status(200).json(patient_history);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json("You are not allowed!");
  }  
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isDoctor) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

module.exports = router;