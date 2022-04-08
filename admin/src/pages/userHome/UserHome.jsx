import "./userHome.css";
import { useContext, useEffect } from "react";
import { HospitalContext } from "../../context/hospitalContext/HospitalContext";
import { getAllHospitals } from "../../context/hospitalContext/apiCalls";
import BackgroundLetterAvatar, { getname } from "../../components/avatar/Avatar";
import Navbar from "../../components/navbar/Navbar";

export default function UserHome() {

    // const [toggleInfo, setToggleInfo] = useState(true);

    // const handleToggleInfo = (e) => {
    //     setToggleInfo(!toggleInfo);
    // }

    const {hospitals, dispatch} = useContext(HospitalContext);

    useEffect(() => {
        getAllHospitals(dispatch);
    }, [dispatch]);

    return (
        <>
        <Navbar />
      <div className="featuredForPatient">
      <img className="coverimg"
        src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
        alt=""
      />
      </div>
    <div className="hospitalListForPatient">
        {/* {toggleInfo ?  <div className="hospitalInfoForPatient">
            <div className="hospitalInfoItem">
                <img className="hospitalPic" src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg" alt=""/>
                <span className="hospitalInfoName">Apollo Hospital</span>
            </div>

            <div className="hospitalInfoItemForPatient">
            <span className="hospitalInfoBeds">Phone Number: </span>
                <span className="hospitalInfoBeds">7984256314</span>
            </div>

            <div className="hospitalInfoItemForPatient">
            <span className="hospitalInfoBeds">Vacent Beds: </span>
                <span className="hospitalInfoBeds">63</span>
            </div>

            <div className="hospitalInfoItemForPatient">
                <span className="hospitalInfoButton" onClick={handleToggleInfo}>More Info</span>
            </div>
        </div> : 
        <div className="hospitalInfoHidden">
        <div className="hospitalInfoItemHidden">
            <img className="hospitalPic" src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg" alt=""/>
            <span className="hospitalInfoNameHidden">Apollo Hospital</span>
        </div>

        <div className="hospitalInfoItemHidden">
        <span className="hospitalInfoBeds">Phone Number: </span>
            <span className="hospitalInfoBeds">7984256314</span>
        </div>

        <div className="hospitalInfoItemHidden">
        <span className="hospitalInfoBeds">Vacent Beds: </span>
            <span className="hospitalInfoBeds">63</span>
        </div>

        <div className="hospitalInfoItemHidden">
            <span className="hospitalInfoButtonForPatient" onClick={handleToggleInfo}>Less Info</span>
        </div>

        <div className="hospitalInfoItemHidden">
        <span className="hospitalInfoBeds">Address: </span>
            <span className="hospitalInfoBeds">kjhfakjhdkadhfkashd</span>
        </div>

        <div className="hospitalInfoItemHidden">
        <span className="hospitalInfoBeds">Numbers of Doctors: </span>
            <span className="hospitalInfoBeds">3</span>
        </div>

        <div className="hospitalInfoItemHidden">
        <span className="hospitalInfoBeds">Numbers of Patients: </span>
            <span className="hospitalInfoBeds">78</span>
        </div>

    </div>} */}
    {hospitals.map((hospital) => 
    <div key={hospital._id} className="hospitalInfoForPatient">
    <div className="hospitalInfoItemForPatient">
        {hospital.profilePic !== undefined ? <img className="hospitalPic" src={hospital.profilePic} alt=""/> :
        <div className="hospitalPic"><BackgroundLetterAvatar {...getname(hospital.hospitalname)}/></div>}
        <span className="hospitalInfoName">{hospital.hospitalname}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
    <span className="hospitalInfoBeds">Phone Number: </span>
        <span className="hospitalInfoBeds">{hospital.phone_number}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
    <span className="hospitalInfoBeds">Vacent Beds: </span>
        <span className="hospitalInfoBeds">{hospital.vacant_bed}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Address: </span>
            <span className="hospitalInfoBeds">{hospital.address}</span>
        </div>

        <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Numbers of Doctors: </span>
            <span className="hospitalInfoBeds">{hospital.doctors_info.length}</span>
        </div>

        <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Numbers of Patients: </span>
            <span className="hospitalInfoBeds">{hospital.patient_info.length}</span>
        </div>

    </div>)}
    </div>
      </>
    );
}