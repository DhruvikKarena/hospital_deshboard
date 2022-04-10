const DoctorReducer = (state, action) => {
    switch (action.type) {
      case "GET_DOCTORS_START":
        return {
          doctors: [],
          isFetching: true,
          error: false,
        };
      case "GET_DOCTORS_SUCCESS":
        return {
          doctors: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_DOCTORS_FAILURE":
        return {
          doctors: [],
          isFetching: false,
          error: true,
        };
      case "ADD_DOCTOR_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "ADD_DOCTOR_SUCCESS":
        return {
          doctors: [...state.doctors, action.payload],
          isFetching: false,
          error: false,
        };
      case "ADD_DOCTOR_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
    //   case "UPLOAD_DOCTOR_START":
    //     return {
    //       ...state,
    //       isFetching: true,
    //       error: false,
    //     };
    //   case "UPLOAD_DOCTOR_SUCCESS":
    //     return {
    //       DOCTORs: state.DOCTORs.map(
    //         (DOCTOR) => DOCTOR._id === action.payload._id && action.payload
    //       ),
    //       isFetching: false,
    //       error: false,
    //     };
    //   case "UPLOAD_DOCTOR_FAILURE":
    //     return {
    //       ...state,
    //       isFetching: false,
    //       error: true,
    //     };
      case "DELETE_DOCTOR_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "DELETE_DOCTOR_SUCCESS":
        return {
          doctors: state.doctors.filter((doctor) => doctor._id !== action.payload),
          isFetching: false,
          error: false,
        };
      case "DELETE_DOCTOR_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "UPDATE_DOCTOR_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPDATE_DOCTOR_SUCCESS":
        return {
          doctors: state.doctor,
          isFetching: false,
          error: false,
        };
      case "UPDATE_DOCTOR_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      default:
        return { ...state };
    }
  };
  
  export default DoctorReducer;
  