const UserReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_USER_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPDATE_USER_SUCCESS":
        return {
          users: [action.payload],
          isFetching: false,
          error: false,
        };
      case "UPDATE_USER_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };

      default:
        return { ...state };
    }
  };
  
  export default UserReducer;
  