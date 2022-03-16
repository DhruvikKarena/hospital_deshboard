import HospitalReducer from "./HospitalReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  hospitals: [],
  isFetching: false,
  error: false,
};

export const HospitalContext = createContext(INITIAL_STATE);

export const HospitalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HospitalReducer, INITIAL_STATE);
  return (
    <HospitalContext.Provider
      value={{
        hospitals: state.hospitals,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};
