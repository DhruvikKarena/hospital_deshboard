import axios from "axios";
import { loginFailure, loginStart, loginSuccess, registerStart, registerSuccess, registerFailure } from "./AuthActions";

export const loginHospital = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/loginHospital", user);
    res.data.isHospital && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerHospital = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("auth/registerHospital", user);
    //console.log(user);
    //res.data.isHospital && dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

