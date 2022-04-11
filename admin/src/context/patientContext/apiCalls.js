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
  getPatientHistoryStart,
  getPatientHistorySuccess,
  getPatientHistoryFailure,
  getLatestPatientsStart,
  getLatestPatientsSuccess,
  getLatestPatientsFailure,
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
  console.log(patient);
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

//get patients history

export const getPatientHistory = async ( dispatch) => {
  dispatch(getPatientHistoryStart());
  try {
    const res = await axios.get("/users/findhistory/"+JSON.parse(localStorage.getItem("user"))._id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getPatientHistorySuccess(res.data));
  } catch (err) {
    dispatch(getPatientHistoryFailure());
  }
};

//get Doctor patients history

export const getDocPatientHistory = async ( dispatch) => {
  dispatch(getPatientHistoryStart());
  try {
    const res = await axios.get("/doctor/doc-patient-history/"+JSON.parse(localStorage.getItem("user"))._id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getPatientHistorySuccess(res.data));
  } catch (err) {
    dispatch(getPatientHistoryFailure());
  }
};

//get latest patient info
export const getLatestPatients = async (dispatch) => {
  dispatch(getLatestPatientsStart());
  try {
    const res = await axios.get("/hospital/findPatients/"+JSON.parse(localStorage.getItem("user"))._id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getLatestPatientsSuccess(res.data));
  } catch (err) {
    dispatch(getLatestPatientsFailure());
  }
};