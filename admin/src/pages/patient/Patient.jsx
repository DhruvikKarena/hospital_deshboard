import { useLocation } from "react-router-dom";
import "./patient.css";
import { useContext, useState } from "react";
//import axios from "axios";
//import Chart from "../../components/chart/Chart"
//import {patientData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { updatePatient } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";


export default function Patient() {

    // const [hospital, setHospital] = useState([]);

    // useEffect(() => {
    //     const getHospital = async () => {
    //       try{
    
    //         const res = await axios.get("/hospital/find/"+JSON.parse(localStorage.getItem("user"))._id, {
    //           headers: {
    //             token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //           },
    //         });
    //         setHospital(res.data);
    //       }catch(err){
    //         console.log(err);
    //       }
    //     };
    //     getHospital();
    //     setUpdate_Patient(update_patient => ({ ...update_patient, id: patient._id, 
    //         hospital_id: JSON.parse(localStorage.getItem("user"))._id }));
    //   },[])

    const location = useLocation();
    const patient = location.patient;
    
    const [update_patient, setUpdate_Patient] = useState( {id: patient._id, 
        hospital_id: JSON.parse(localStorage.getItem("user"))._id ,
        vacant_beds: JSON.parse(localStorage.getItem("user")).vacant_bed});

    const {dispatch} = useContext(PatientContext);

    // useEffect(() => {
    //     setUpdate_Patient(update_patient => ({ ...update_patient, }));
    // }, patient._id);

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
            //console.log("in 2 if")
            const value = parseFloat(e.target.value);
            //const value = e.target.value;
            setUpdate_Patient({ ...update_patient, [e.target.name]: value });
            // console.log("value "+value);
            // console.log(typeof(value));
        }

        if(e.target.name === "isAdmitted" && e.target.value === "false"){
            const temp = JSON.parse(window.localStorage.getItem("user"));
            temp["vacant_bed"] =  update_patient.vacant_beds + 1;
            //console.log(temp);
            window.localStorage.setItem("user", JSON.stringify(temp));
        }
        // setUpdate_Patient({ ...update_patient, vacant_beds: hospital.vacant_bed });
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
                  <img src={"https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} alt="" className="patientInfoImg" />
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
                      {patient.isActive ? <Button type="Active" /> : <Button type="Closed" /> }
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey" id="isAdmitted" >Admitted:</span>
                      {patient.isAdmitted ? <Button type="Yes" /> : <Button type="No" /> }
                  </div>
                  <div className="patientInfoItem">
                      <span className="patientInfoKey" id="isOperationNeeded" >Operation Needed:</span>
                      {patient.isOperationNeeded ? <Button type="Yes" /> : <Button type="No" /> }
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
                  <input type="file" />
              </div>
              <div className="patientFormRight">
                  <div className="patientUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="patientUploadImg" />
                      <label type="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="patientButton" onClick={handleUpdate}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
