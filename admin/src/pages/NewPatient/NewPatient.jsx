import "./newPatient.css";
import storage from "../../firebase";
import { useContext, useState  } from "react";
import { createPatient } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";


export default function NewPatient() {
  // const [hospital, setHospital] = useState([]);
  // 
  // useEffect(() => {
  //   const getHospital = async () => {
  //     try{

  //       const res = await axios.get("/hospital/find/"+JSON.parse(localStorage.getItem("user"))._id, {
  //         headers: {
  //           token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //         },
  //       });
  //       setHospital(res.data);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   };
  //   getHospital();
  // },[])
  //console.log(hospital);

  const [patient, setPatient] = useState({vacant_beds: JSON.parse(localStorage.getItem("user")).vacant_bed});

//   useEffect(() => {
//     setPatient(update_patient => ({ ...update_patient, 
//         vacant_beds: JSON.parse(localStorage.getItem("user")).vacant_bed }));
// }, JSON.parse(localStorage.getItem("user")).vacant_bed);

  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);

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
      //setPatient({ ...patient, [e.target.name]: value });
      console.log(patient);
      if(e.target.name === "isAdmitted" && e.target.value === "true"){
        const temp = JSON.parse(window.localStorage.getItem("user"));
        temp["vacant_bed"] =  patient.vacant_beds - 1;
        //console.log(temp);
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
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setPatient((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    //setPatient({ ...patient, vacant_beds: hospital.vacant_bed });
    e.preventDefault();
    upload([
      { file: img, label: "photos_of_reports" },
    ]);
  };


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
          <input type="file" id="file" name="photos_of_reports" onChange={(e) => setImg(e.target.files[0])}/>
        </div>
        {uploaded === 1 ? (<button className="addPatientButton" onClick={handleSubmit}>Create</button>):
        (<button className="addPatientButton" onClick={handleUpload}>Upload</button>)}
      </form>
    </div>
  );
}
