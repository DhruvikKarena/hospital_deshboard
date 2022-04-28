import { Link } from "react-router-dom";
import { logOut } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";
import "./navbar.css";

export default function Navbar() {
  const {dispatch} = useContext(AuthContext);

  const handleLogout = (e) => {
    logOut(dispatch);
  }

    return (
        <div className= "navbar">
            {/* {console.log(hospitals)} */}
        <div className="containerForPatient">
          <div className="leftForPatient">
          <Link to="/patientpage" className="link"><span className="pagelinks">Home</span></Link>
          </div>
          <div className="rightForPatient">
            {/* <Search className="icon" />
            <span>KID</span>
            <Notifications className="icon" />
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            /> */}
            <a className="link" href="https://quiet-savannah-30205.herokuapp.com/"><span className="pagelinks">Prediction</span></a>
            <Link to={"/userhistory"} className="link"><span className="pagelinks">History</span></Link>
            <Link to={"/"} className="link"><span className="pagelinks" onClick={handleLogout}>Logout</span></Link>
          </div>
        </div>
        </div>
    );  
}
