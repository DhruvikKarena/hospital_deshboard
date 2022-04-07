import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import DoctorList from "./pages/doctorList/DoctorList";
import PatientList from "./pages/patientList/PatientList";
import Patient from "./pages/patient/Patient"
import NewPatient from "./pages/NewPatient/NewPatient";
import Doctor from "./pages/doctor/Doctor";
import HospitalInfo from "./pages/hospitalInfo/HospitalInfo";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { PatientContext } from "./context/patientContext/PatientContext";
import { useContext } from "react";
import NewDoctor from "./pages/NewDoctor/NewDoctor";
import UserHome from "./pages/userHome/UserHome";
import UserHistory from "./pages/userHistory/UserHistory";

const HomePages = () => {
  if(JSON.parse(localStorage.getItem("hospital"))){
    return <Redirect to="/home" />;
  }

  else if(JSON.parse(localStorage.getItem("doctor"))){
    return <Redirect to="/doctorpage" />;
  }

  else if(JSON.parse(localStorage.getItem("patient"))){
    return <Redirect to="/patientpage" />;
  }
}

function App() {
  const { user } = useContext(AuthContext);
  const { patients } = useContext(PatientContext);
  return (
    <Router>
      <Switch>
      <Route exact path="/">
      { user === null  ? <Login /> : HomePages() }    
      </Route>
      {user && JSON.parse(localStorage.getItem("hospital")) &&
      <> 
      <Topbar />
      <div className="container">
      <Sidebar />
          <Route exact path="/home">
            <Home /> 
          </Route>
          <Route path="/doctors">
            <DoctorList />
          </Route>
          <Route path="/doctor/:doctorId">
            <Doctor />
          </Route>
          <Route path="/newDoctor">
            <NewDoctor />
          </Route>
          <Route path="/patients">
            <PatientList />
          </Route>
          <Route path="/patient/:patientId">
          {patients.length !== 0 ?  <Patient /> :  <Redirect to="/patients" />}
          </Route>
          <Route path="/newPatient">
            <NewPatient />
          </Route>
          <Route path="/hospitalInfo">
            <HospitalInfo />
          </Route>
      </div>
      </>}
      {user &&
        <Route path="/doctorpage">
            <>
            <div><h1>Doctor</h1></div>
            </>
        </Route>}
      {user && 
      <>      
      <Route path="/patientpage">
        <UserHome />
      </Route>
      <Route path={"/userhistory"}>
        <UserHistory />
      </Route>
      </>
      }
      </Switch>
    </Router>
  );
}

export default App;
