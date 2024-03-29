import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { DoctorContextProvider } from './context/doctorContext/DoctorContext';
import { PatientContextProvider } from './context/patientContext/PatientContext';
import { HospitalContextProvider } from './context/hospitalContext/HospitalContext';
import { UserContextProvider } from './context/userContext/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DoctorContextProvider>
        <HospitalContextProvider>
          <PatientContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </PatientContextProvider>
        </HospitalContextProvider>
      </DoctorContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
