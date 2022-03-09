import DoctorReducer from "./DoctorReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  doctors: [],
  isFetching: false,
  error: false,
};

export const DoctorContext = createContext(INITIAL_STATE);

export const DoctorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DoctorReducer, INITIAL_STATE);
  return (
    <DoctorContext.Provider
      value={{
        doctors: state.doctors,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
