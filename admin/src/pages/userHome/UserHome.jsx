import "./userHome.css";
import { useContext, useEffect } from "react";
import { HospitalContext } from "../../context/hospitalContext/HospitalContext";
import { getAllHospitals } from "../../context/hospitalContext/apiCalls";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import Navbar from "../../components/navbar/Navbar";
import ImageLoader from '../../components/imageLoader/ImageLoader';

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
    {hospitals.map((hospital) => 
    <div key={hospital._id} className="hospitalInfoForPatient">
    <div className="hospitalInfoItemForPatient">
        {hospital.profilePic !== undefined ? <ImageLoader key={hospital.profilePic} value={hospital.profilePic} varient={"circle"} /> :
        <div className="hospitalPic"><BackgroundLetterAvatar value={hospital.hospitalname}/></div>}
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