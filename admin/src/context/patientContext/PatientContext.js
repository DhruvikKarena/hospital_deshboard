import PatientReducer from "./PatientReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  patients: [],
  isFetching: false,
  error: false,
};

export const PatientContext = createContext(INITIAL_STATE);

export const PatientContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientReducer, INITIAL_STATE);
  return (
    <PatientContext.Provider
      value={{
        patients: state.patients,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
