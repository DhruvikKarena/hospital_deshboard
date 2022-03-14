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
// import User from "./pages/user/User";
//import NewUser from "./pages/newUser/NewUser";
//import ProductList from "./pages/productList/ProductList";
//import Product from "./pages/product/Product";
//import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { PatientContext } from "./context/patientContext/PatientContext";
import { useContext } from "react";
import NewDoctor from "./pages/NewDoctor/NewDoctor";

function App() {
  const { user } = useContext(AuthContext);
  const { patients } = useContext(PatientContext);
  return (
    <Router>
      <Switch>
      <Route exact path="/">
      { user === null  ? <Login /> : <Redirect to="/home" /> }    
      </Route>
      {user && 
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
          {/* <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>      */}
      </div>
      </>}
      </Switch>
    </Router>
  );
}

export default App;
