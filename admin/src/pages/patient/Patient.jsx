import { useLocation } from "react-router-dom";
import "./patient.css";
import { useContext, useState } from "react";
import storage from "../../firebase";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import { updatePatient } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel/CircularProgressWithLabel';
import ImageLoader from '../../components/imageLoader/ImageLoader';


export default function Patient() {
    const location = useLocation();
    const patient = location.patient;
    
    const [update_patient, setUpdate_Patient] = useState( {id: patient._id, 
        hospital_id: JSON.parse(localStorage.getItem("user"))._id ,
        vacant_beds: JSON.parse(localStorage.getItem("user")).vacant_bed});

    const {dispatch} = useContext(PatientContext);
    const [img, setImg] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleToggle = (e) => {
        setToggle(!toggle);
        setProgress(0);
      }

      const upload = (items) => {
        items.forEach((item) => {
          const fileName = new Date().getTime() + item.label + item.file.name;
          const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
              console.log(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                setUpdate_Patient((prev) => {
                  return { ...prev, [item.label]: url };
                });
                handleToggle();
              });
            }
          );
        });
      };

    
    const handleUpload = (e) => {
        e.preventDefault();
        upload([
        { file: img, label: "photos_of_reports" },
        ]);
    };

    const Button = ({ type }) => {
        return <button className={"patientInfoValue " + type}>{type}</button>;
      };
    

    const handleChange = (e) => {
        console.log(e.target.name);
        
        if(e.target.value !== "" && e.target.name !== "amount" ){
            const value = e.target.value;
            setUpdate_Patient({ ...update_patient, [e.target.name]: value });
        }

        if(e.target.name === "amount" && e.target.value !== ""){
            const value = parseFloat(e.target.value);
            setUpdate_Patient({ ...update_patient, [e.target.name]: value });
        }

        if(e.target.name === "isAdmitted" && e.target.value === "false"){
            const temp = JSON.parse(window.localStorage.getItem("user"));
            temp["vacant_bed"] =  update_patient.vacant_beds + 1;
            window.localStorage.setItem("user", JSON.stringify(temp));
        }
      };


    const handleUpdate = (e) => {
        
        console.log(update_patient);
        e.preventDefault();
        updatePatient(update_patient, dispatch);

      };
    
    
  return (
    <div className="patient">
      <div className="patientTitleContainer">
        <h1 className="patientTitle">Patient</h1>
      </div>
      <div className="patientTop">
          <div className="patientTopRight">
              <div className="patientInfoTop">
                  <div className="patientInfoImg">
                    {patient.profilePic !== undefined ? <img className="doctorListImg" src={patient.profilePic} alt=""/> :
                    <div className="avtimgdoc"><BackgroundLetterAvatar value={patient.patient_name}/></div>}
                  </div>
                  <span className="patientName">{patient.patient_name}</span>
              </div>
              <div className="patientInfoBottom">
                  <div className="patientInfoItem">
                      <span className="patientInfoKey">Patient Id:</span>
                      <span className="patientInfoValue" >{patient._id}</span>
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey">Doctor Name:</span>
                      <span className="patientInfoValue">{patient.doctor_name}</span>
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey">Cause Of Illness:</span>
                      <span className="patientInfoValue">{patient.cause_of_illness}</span>
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey">Medicines:</span>
                      <span className="patientInfoValue">{patient.medicines.map((medicine) => medicine+", ")}</span>
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey">Amount:</span>
                      <span className="patientInfoValue">{patient.amount}</span>
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey">Description:</span>
                      <span className="patientInfoValue">{patient.description}</span>
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey" id="isActive" >Active:</span>
                      {patient.isActive ? <Button className="patientInfoValue" type="Active" /> : <Button className="patientInfoValue" type="Closed" /> }
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey" id="isAdmitted" >Admitted:</span>
                      {patient.isAdmitted ? <Button className="patientInfoValue" type="Yes" /> : <Button className="patientInfoValue" type="No" /> }
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey" id="isOperationNeeded" >Operation Needed:</span>
                      {patient.isOperationNeeded ? <Button className="patientInfoValue" type="Yes" /> : <Button className="patientInfoValue" type="No" /> }
                  </div>
                  <div className="patientInfoItem">
                    <span className="patientInfoKey" id="photos_of_reports">Photos Of Reports:</span>
                  </div>
                  <div className="patientReports">
                  {patient.photos_of_reports.map((photos_of_report) =>(<ImageLoader key={photos_of_report} value={photos_of_report} />))}
                  </div>
              </div>
          </div>
      </div>
      <div className="patientBottom">
          <form className="patientForm">
              <div className="patientFormLeft">
                  <label>Cause Of Illness</label>
                  <input type="text" placeholder="Cause Of Illness" name="cause_of_illness" onChange={handleChange}/>
                  <label>Amount</label>
                  <input type="text" placeholder="Amount" name="amount" onChange={handleChange}/>
                  <label>Medicines</label>
                  <input type="text" placeholder="Medicines" name="medicines" onChange={handleChange}/>
                  <label>Description</label>
                  <input type="text" placeholder="Description" name="description" onChange={handleChange}/>
                  <label>Active</label>
                    <select name="isActive" onChange={handleChange}>
                        <option >chose</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <label>Operation</label>
                    <select name="isOperationNeeded" onChange={handleChange}>
                        <option >chose</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <label>Admitted</label>
                    <select name="isAdmitted" onChange={handleChange}>
                        <option >chose</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                  <label>Photos of Reports</label>
                  <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" checked={toggle} onChange={handleToggle} />
                    <label style={{ background: toggle && '#06D6A0' }} className="react-switch-label" htmlFor={`react-switch-new`} >
                        <span className={`react-switch-button`} />
                    </label>
                  <input type="file" id="file" name="photos_of_reports" onChange={(e) => setImg(e.target.files[0])}/>
              </div>
              <div className="patientFormRight">
                  <div className="patientUpload">
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  {toggle ? (<button className="patientButton" onClick={handleUpload} >Upload</button>) :
                    (<button className="patientButton" onClick={handleUpdate}>Update</button>) }
                  <div className='doctorProgress'>
                    {toggle ? <CircularProgressWithLabel value={progress} /> : <></>}
                  </div>
              </div>
          </form>
      </div>
    </div>
  );
}
