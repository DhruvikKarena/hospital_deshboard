
  export const updateHospitalStart = () => ({
    type: "UPDATE_HOSPITAL_START",
  });
  
  export const updateHospitalSuccess = (hospital) => ({
    type: "UPDATE_HOSPITAL_SUCCESS",
    payload: hospital,
  });
  
  export const updateHospitalFailure = () => ({
    type: "UPDATE_HOSPITAL_FAILURE",
  });
  
  export const getAllHospitalsStart = () => ({
    type: "GET_ALL_HOSPITALS_START",
  });
  
  export const getAllHospitalsSuccess = (hospitals) => ({
    type: "GET_ALL_HOSPITALS_SUCCESS",
    payload: hospitals,
  });
  
  export const getAllHospitalsFailure = () => ({
    type: "GET_ALL_HOSPITALS_FAILURE",
  });
