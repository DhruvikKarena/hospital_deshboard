export const getPatientsStart = () => ({
    type: "GET_PATIENTS_START",
  });
  
  export const getPatientsSuccess = (patients) => ({
    type: "GET_PATIENTS_SUCCESS",
    payload: patients,
  });
  
  export const getPatientsFailure = () => ({
    type: "GET_PATIENTS_FAILURE",
  });

  export const createPatientStart = () => ({
    type: "CREATE_PATIENT_START",
  });
  
  export const createPatientSuccess = (patient) => ({
    type: "CREATE_PATIENT_SUCCESS",
    payload: patient,
  });
  
  export const createPatientFailure = () => ({
    type: "CREATE_PATIENT_FAILURE",
  });

  export const deletePatientStart = () => ({
    type: "DELETE_PATIENT_START",
  });
  
  export const deletePatientSuccess = (id) => ({
    type: "DELETE_PATIENT_SUCCESS",
    payload: id,
  });
  
  export const deletePatientFailure = () => ({
    type: "DELETE_PATIENT_FAILURE",
  });

  export const updatePatientStart = () => ({
    type: "UPDATE_PATIENT_START",
  });
  
  export const updatePatientSuccess = (patient) => ({
    type: "UPDATE_PATIENT_SUCCESS",
    payload: patient,
  });
  
  export const updatePatientFailure = () => ({
    type: "UPDATE_PATIENT_FAILURE",
  });
  