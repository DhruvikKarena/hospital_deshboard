
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
  