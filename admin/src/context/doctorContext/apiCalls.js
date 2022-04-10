import axios from "axios";
import {
  addDoctorFailure,
  addDoctorStart,
  addDoctorSuccess,
  deleteDoctorFailure,
  deleteDoctorStart,
  deleteDoctorSuccess,
  getDoctorsFailure,
  getDoctorsStart,
  getDoctorsSuccess,
  updateDoctorStart,
  updateDoctorSuccess,
  updateDoctorFailure,
} from "./DoctorActions";

export const getDoctors = async (dispatch) => {
  dispatch(getDoctorsStart());
  try {
    const res = await axios.get("/hospital/findDoctorinfo/"+JSON.parse(localStorage.getItem("user"))._id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getDoctorsSuccess(res.data));
  } catch (err) {
    dispatch(getDoctorsFailure());
  }
};

//add
export const addDoctor = async (doctor, dispatch) => {
  dispatch(addDoctorStart());
  try {
    const res = await axios.put("/hospital/adddoctor/"+JSON.parse(localStorage.getItem("user"))._id, doctor, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(addDoctorSuccess(res.data));
  } catch (err) {
    dispatch(addDoctorFailure());
  }
};

//delete
export const deleteDoctor = async (doctor, dispatch) => {
  dispatch(deleteDoctorStart());
  try {
      await axios.put("/hospital/deletedoctor/"+JSON.parse(localStorage.getItem("user"))._id, doctor, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteDoctorSuccess(doctor.doctors_id));
  } catch (err) {
    dispatch(deleteDoctorFailure());
  }
};

//update
export const updateDoctor = async (doctor, dispatch) => {
  // console.log(user);
  dispatch(updateDoctorStart());
  try {
      await axios.put("/doctor/"+doctor.id, doctor, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateDoctorSuccess(doctor));
  } catch (err) {
    dispatch(updateDoctorFailure());
  }
};