const HospitalReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_HOSPITAL_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPDATE_HOSPITAL_SUCCESS":
        return {
          hospitals: state.hospital,
          isFetching: false,
          error: false,
        };
      case "UPDATE_HOSPITAL_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };

      default:
        return { ...state };
    }
  };
  
  export default HospitalReducer;
  