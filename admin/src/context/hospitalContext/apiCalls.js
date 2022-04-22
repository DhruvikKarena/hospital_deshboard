import axios from "axios";
import {
  updateHospitalStart,
  updateHospitalSuccess,
  updateHospitalFailure,
  getAllHospitalsStart,
  getAllHospitalsSuccess,
  getAllHospitalsFailure
} from "./HospitalActions";

//update
export const updateHospital = async (hospital, dispatch) => {
  //console.log(Hospital);
  dispatch(updateHospitalStart());
  try {
    const res = await axios.put("/hospital/"+hospital.id, hospital, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateHospitalSuccess(res.data));
  } catch (err) {
    dispatch(updateHospitalFailure());
  }
};

//get all hospitals

export const getAllHospitals = async (position,dispatch) => {
  dispatch(getAllHospitalsStart());
  try {
    const res = await axios.get("/hospital/allHospitals/?lat="+JSON.stringify(position.lat)+"&lng="+JSON.stringify(position.lng), {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getAllHospitalsSuccess(res.data));
  } catch (err) {
    dispatch(getAllHospitalsFailure());
  }
};