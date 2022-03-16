const PatientReducer = (state, action) => {
    switch (action.type) {
      case "GET_PATIENTS_START":
        return {
          patients: [],
          isFetching: true,
          error: false,
        };
      case "GET_PATIENTS_SUCCESS":
        return {
          patients: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_PATIENTS_FAILURE":
        return {
          patients: [],
          isFetching: false,
          error: true,
        };
      case "CREATE_PATIENT_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "CREATE_PATIENT_SUCCESS":
        return {
          patients: [...state.patients, action.payload],
          isFetching: false,
          error: false,
        };
      case "CREATE_PATIENT_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "UPDATE_PATIENT_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPDATE_PATIENT_SUCCESS":
        return {
          Patients: state.Patients.map(
            (Patient) => Patient._id === action.payload._id && action.payload
          ),
          isFetching: false,
          error: false,
        };
      case "UPDATE_PATIENT_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "DELETE_PATIENT_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "DELETE_PATIENT_SUCCESS":
        return {
          patients: state.patients.filter((patient) => patient._id !== action.payload),
          isFetching: false,
          error: false,
        };
      case "DELETE_PATIENT_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      default:
        return { ...state };
    }
  };
  
  export default PatientReducer;
  