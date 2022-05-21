import axios from "axios";
import { loginFailure, loginStart, loginSuccess, registerStart, registerFailure, logout } from "./AuthActions";

//for login into hospital
export const loginHospital = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/loginHospital", user);
    localStorage.setItem("hospital", "true");
    res.data.isHospital && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// to register hospital
export const registerHospital = async (user, dispatch) => {
  dispatch(registerStart());
  try {
     await axios.post("auth/registerHospital", user);
  } catch (err) {
    dispatch(registerFailure());
  }
};

// to register doctor
export const registerDoctor = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    await axios.post("auth/registerdoctor", user);
  } catch (err) {
    dispatch(registerFailure());
  }
};

//for login into doctor page
export const loginDoctor = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/loginDoctor", user);
    localStorage.setItem("doctor", "true");
    res.data.isDoctor && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// to register patient or user
export const registerPatient = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    await axios.post("auth/register", user);
    console.log(user);
    //res.data.isHospital && dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

//for login into patient page
export const loginPatient = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    localStorage.setItem("patient", "true");
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logOut = async (dispatch) => {
  dispatch(logout());
  window.localStorage.clear();
}
