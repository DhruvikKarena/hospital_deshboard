import { useLocation } from "react-router-dom";
import "./doctor.css";
//import Chart from "../../components/chart/Chart"
//import {doctorData} from "../../dummyData"
//import { Publish } from "@material-ui/icons";

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
                  <img src={"https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} alt="" className="doctorInfoImg" />
                  <span className="doctorName">{doctor.doctor_name}</span>
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
              </div>
          </div>
      </div>
      {/* <div className="doctorBottom">
          <form className="doctorForm">
              <div className="doctorFormLeft">
                  <label>doctor Id</label>
                  <input type="text" placeholder="doctor Id" />
                  <label>Doctor Name</label>
                  <input type="text" placeholder="Doctor Name" />
                  <label>Cause Of Illness</label>
                  <input type="text" placeholder="Cause Of Illness" />
                  <label>Medicines</label>
                  <input type="text" placeholder="Medicines" />
                  <label>Photos of Reports</label>
                  <input type="file" />
              </div>
              <div className="doctorFormRight">
                  <div className="doctorUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="doctorUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="doctorButton">Update</button>
              </div>
          </form>
      </div> */}
    </div>
  );
}
