import "./newPatient.css";
import storage from "../../firebase";
import { useContext, useState  } from "react";
import { createPatient } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel/CircularProgressWithLabel';


export default function NewPatient() {

  const [patient, setPatient] = useState({vacant_beds: JSON.parse(localStorage.getItem("user")).vacant_bed});

  const [img, setImg] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [progress, setProgress] = useState(0);

  const {dispatch} = useContext(PatientContext);

  const handleChange = (e) => {
    if(e.target.name === "amount"){
      const value = parseFloat(e.target.value);
      setPatient({ ...patient, [e.target.name]: value });
    }
    else{
      const value = e.target.value;
      setPatient({ ...patient, [e.target.name]: value });
    }
      console.log(patient);
      if(e.target.name === "isAdmitted" && e.target.value === "true"){
        const temp = JSON.parse(window.localStorage.getItem("user"));
        temp["vacant_bed"] =  patient.vacant_beds - 1;
        window.localStorage.setItem("user", JSON.stringify(temp));
    }
  };

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
            setPatient((prev) => {
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

  const handleToggle = (e) => {
    setToggle(!toggle);
    setProgress(0);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPatient(patient, dispatch);
  };

  return (
    <div className="newPatient">
      <h1 className="addPatientTitle">New Patient</h1>
      <form className="addPatientForm">
        <div className="addPatientItem">
          <label>Patient Name</label>
          <input type="text" placeholder="Patient Names" name="patient_name" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Patient Id</label>
          <input type="text" placeholder="Patient Id" name="patient_id" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Doctor Name</label>
          <input type="text" placeholder="Doctor Name" name="doctor_name" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Doctor Id</label>
          <input type="text" placeholder="Doctor Id" name="doctor_id" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Hospital Name</label>
          <input type="text" placeholder="Hospital Name" name="hospitalname" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Hospital Id</label>
          <input type="text" placeholder="Hospital Id" name="hospital_id" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Caus Of Illness</label>
          <input type="text" placeholder="Caus Of Illness" name="cause_of_illness" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Medicines</label>
          <input type="text" placeholder="Medicines" name="medicines" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Amount</label>
          <input type="text" placeholder="Amount" name="amount" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name="description" onChange={handleChange}/>
        </div>
        <div className="addPatientItem">
          <label>Active</label>
          <select id="isActive" name="isActive" onChange={handleChange}>
            <option >chose</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addPatientItem">
        <label>Admitted</label>
          <select id="isAdmitted" name="isAdmitted" onChange={handleChange}>
            <option >chose</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div><div className="addPatientItem">
          <label>OperationNeeded</label>
          <select id="isOperationNeeded" name="isOperationNeeded" onChange={handleChange}>
            <option >chose</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addPatientItem">
          <label>Photos Of Reports</label>
          <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" checked={toggle} onChange={handleToggle} />
            <label style={{ background: toggle && '#06D6A0' }} className="react-switch-label" htmlFor={`react-switch-new`} >
              <span className={`react-switch-button`} />
            </label>
          <input type="file" id="file" name="photos_of_reports" onChange={(e) => setImg(e.target.files[0])}/>
        </div>
        <div className="addPatientItem">
        {toggle ? (<button className="addPatientButton" onClick={handleUpload} >Upload</button>) :
         (<button className="addPatientButton" onClick={handleSubmit}>Create</button>) }
         <div className='dProgress'>
            {toggle ? <CircularProgressWithLabel value={progress} /> : <></>}
            </div>
        </div>
      </form>
    </div>
  );
}
