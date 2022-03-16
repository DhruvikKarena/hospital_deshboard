import axios from "axios";
import {
  updateHospitalStart,
  updateHospitalSuccess,
  updateHospitalFailure,
} from "./HospitalActions";

//update
export const updateHospital = async (hospital, dispatch) => {
  //console.log(Hospital);
  dispatch(updateHospitalStart());
  try {
      await axios.put("/hospital/"+hospital.id, hospital, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateHospitalSuccess(hospital));
  } catch (err) {
    dispatch(updateHospitalFailure());
  }
};