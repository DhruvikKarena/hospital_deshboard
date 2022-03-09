import "./newDoctor.css";
import { useContext, useState } from "react";
import { addDoctor } from "../../context/doctorContext/apiCalls";
import { DoctorContext } from "../../context/doctorContext/DoctorContext";


export default function NewDoctor() {
  const [doctor, setDoctor] = useState(null);

  const {dispatch} = useContext(DoctorContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setDoctor({ ...doctor, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor(doctor, dispatch);
  };

  return (
    <div className="newDoctor">
      <h1 className="addDoctorTitle">New Doctor</h1>
      <form className="addDoctorForm">
        <div className="addDoctorItem">
          <label>Doctor Id</label>
          <input type="text" placeholder="Doctor Id" name="doctors_id" onChange={handleChange}/>
        </div>
      </form>    
       <button className="addDoctorButton" onClick={handleSubmit}>Add</button>
    </div>
  );
}
