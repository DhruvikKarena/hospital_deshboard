import { Link } from "react-router-dom";
import { logOut } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";
import "./doctorNavbar.css";

export default function DoctorNavbar() {
  const {dispatch} = useContext(AuthContext);

  const handleLogout = (e) => {
    logOut(dispatch);
  }

    return (
        <div className= "doctornavbar">
        <div className="containerFordoctor">
          <div className="leftFordoctor">
          <Link to="/doctorhome" className="link"><span className="pagelinks">Home</span></Link>
          </div>
          <div className="rightFordoctor">
            <Link to={"/"} className="link"><span className="pagelinks" onClick={handleLogout}>Logout</span></Link>
          </div>
        </div>
        </div>
    );  
}
