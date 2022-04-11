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

  export const getPatientHistoryStart = () => ({
    type: "GET_PATIENT_HISTORY_START",
  });
  
  export const getPatientHistorySuccess = (patients) => ({
    type: "GET_PATIENT_HISTORY_SUCCESS",
    payload: patients,
  });
  
  export const getPatientHistoryFailure = () => ({
    type: "GET_PATIENT_HISTORY_FAILURE",
  });
  
  export const getLatestPatientsStart = () => ({
    type: "GET_LATEST_PATIENTS_START",
  });
  
  export const getLatestPatientsSuccess = (patients) => ({
    type: "GET_LATEST_PATIENTS_SUCCESS",
    payload: patients,
  });
  
  export const getLatestPatientsFailure = () => ({
    type: "GET_LATEST_PATIENTS_FAILURE",
  });