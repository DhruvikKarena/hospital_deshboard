import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { DoctorContextProvider } from './context/doctorContext/DoctorContext';
import { PatientContextProvider } from './context/patientContext/PatientContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DoctorContextProvider>
        <PatientContextProvider>
          <App />
        </PatientContextProvider>
      </DoctorContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
