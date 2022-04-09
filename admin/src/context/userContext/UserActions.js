
  export const updateUserStart = () => ({
    type: "UPDATE_USER_START",
  });
  
  export const updateUserSuccess = (user) => ({
    type: "UPDATE_USER_SUCCESS",
    payload: user,
  });
  
  export const updateUserFailure = () => ({
    type: "UPDATE_USER_FAILURE",
  });