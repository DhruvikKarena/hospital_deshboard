import axios from "axios";
import {
  createPatientFailure,
  createPatientStart,
  createPatientSuccess,
  deletePatientFailure,
  deletePatientStart,
  deletePatientSuccess,
  getPatientsFailure,
  getPatientsStart,
  getPatientsSuccess,
  updatePatientStart,
  updatePatientSuccess,
  updatePatientFailure,
} from "./PatientActions";

//get info
export const getPatients = async (dispatch) => {
  dispatch(getPatientsStart());
  try {
    const res = await axios.get("/hospital/findPatientinfo/"+JSON.parse(localStorage.getItem("user"))._id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getPatientsSuccess(res.data));
  } catch (err) {
    dispatch(getPatientsFailure());
  }
};

//create
export const createPatient = async (patient, dispatch) => {
  dispatch(createPatientStart());
  try {
    const res = await axios.post("/history/", patient, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createPatientSuccess(res.data));
  } catch (err) {
    dispatch(createPatientFailure());
  }
};

//delete
export const deletePatient = async (id, dispatch) => {
  dispatch(deletePatientStart());
  try {
    await axios.delete("/history/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deletePatientSuccess(id));
  } catch (err) {
    dispatch(deletePatientFailure());
  }
};

//update
export const updatePatient = async (patient, dispatch) => {
  //console.log(patient);
  dispatch(updatePatientStart());
  try {
      await axios.put("/history/"+patient.id, patient, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updatePatientSuccess(patient));
  } catch (err) {
    dispatch(updatePatientFailure());
  }
};