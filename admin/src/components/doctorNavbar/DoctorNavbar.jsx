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
            {/* {console.log(hospitals)} */}
        <div className="containerFordoctor">
          <div className="leftFordoctor">
          <Link to="/doctorhome" className="link"><span className="pagelinks">Home</span></Link>
          </div>
          <div className="rightFordoctor">
            {/* <Search className="icon" />
            <span>KID</span>
            <Notifications className="icon" />
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            /> */}
            <Link to={"/"} className="link"><span className="pagelinks" onClick={handleLogout}>Logout</span></Link>
          </div>
        </div>
        </div>
    );  
}
