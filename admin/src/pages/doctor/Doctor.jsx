import { useLocation } from "react-router-dom";
import "./doctor.css";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import ImageLoader from '../../components/imageLoader/ImageLoader';

export default function Doctor() {
    const location = useLocation();
    const doctor = location.doctor;
  return (
    <div className="doctor">
      <div className="doctorTitleContainer">
        <h1 className="doctorTitle">Doctor</h1>
      </div>
      <div className="doctorTop">
          <div className="doctorTopRight">
              <div className="doctorInfoTop">
                <div className="doctorInfoImg">
                    {doctor.profilePic !== undefined ? <ImageLoader key={doctor.profilePic} value={doctor.profilePic} varient={"circle"} /> :
                <div className="avtimgdoc"><BackgroundLetterAvatar value={doctor.doctor_full_name}/></div>}
                </div>
                  <span className="doctorName">{doctor.doctor_full_name}</span>
              </div>
              <div className="doctorInfoBottom">
                  <div className="doctorInfoItem">
                      <span className="doctorInfoKey">id:</span>
                      <span className="doctorInfoValue">{doctor._id}</span>
                  </div>
                  <div className="doctorInfoItem">
                      <span className="doctorInfoKey">specilization In:</span>
                      <span className="doctorInfoValue">{doctor.specilized_in}</span>
                  </div>
                  <div className="doctorInfoItem">
                      <span className="doctorInfoKey">Email:</span>
                      <span className="doctorInfoValue">{doctor.email}</span>
                  </div>
                  <div className="doctorInfoItem">
                      <span className="doctorInfoKey">Phone Number:</span>
                      <span className="doctorInfoValue">{doctor.phone_number}</span>
                  </div>
                  <div className="doctorInfoItem">
                      <span className="doctorInfoKey">Address:</span>
                      <span className="doctorInfoValue">{doctor.address}</span>
                  </div>
                  <div className="doctorInfoItem">
                      <span className="doctorInfoKey">Total Treated Patients:</span>
                      <span className="doctorInfoValue">{doctor.patient_history.length}</span>
                  </div>
                  <div className="doctorInfoItem">
                    <span className="doctorInfoKey" id="doctor_licence">Doctor Licence:</span>
                  </div>
                  <div className="patientReports">
                  {doctor.doctor_licence.map((licence) =>(<ImageLoader key={licence} value={licence} />))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
