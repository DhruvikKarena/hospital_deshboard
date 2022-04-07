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

      case "GET_ALL_HOSPITALS_START":
        return {
          hospitals: [],
          isFetching: true,
          error: false,
        };
      case "GET_ALL_HOSPITALS_SUCCESS":
        return {
          hospitals: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_ALL_HOSPITALS_FAILURE":
        return {
          hospitals: [],
          isFetching: false,
          error: true,
        };

      default:
        return { ...state };
    }
  };
  
  export default HospitalReducer;
  