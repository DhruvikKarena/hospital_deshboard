import { useState, useContext } from "react";
import "./hospitalInfo.css";
import storage from "../../firebase";
import { HospitalContext } from "../../context/hospitalContext/HospitalContext";
import { updateHospital } from "../../context/hospitalContext/apiCalls";

export default function HospitalInfo() {

    const hospitalInfo = JSON.parse(localStorage.getItem("user"));
    const [update_hospital, setUpdate_Hospital] = useState({id: hospitalInfo._id});

    const {dispatch} = useContext(HospitalContext);
    const [img, setImg] = useState(null);
    const [toggle, setToggle] = useState(false);
    // console.log(hospitalInfo);

    const handleToggle = (e) => {
      //e.preventDefault();
      setToggle(!toggle);
      //console.log(toggle);
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
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              setUpdate_Hospital((prev) => {
                return { ...prev, [item.label]: url };
              });
              //setUploaded((prev) => prev + 1);
              handleToggle();
            });
          }
        );
      });
    };

  
  const handleUpload = (e) => {
      e.preventDefault();
      upload([
      { file: img, label: "profilePic" },
      ]);
  };
  

  const handleChange = (e) => {
      console.log(e.target.name);
          //console.log("in 2 if")
          const value = e.target.value;
          setUpdate_Hospital({ ...update_hospital, [e.target.name]: value });
          // console.log("value "+value);
          // console.log(typeof(value));

      // setUpdate_hospital({ ...update_hospital, vacant_beds: hospital.vacant_bed });
    };


  const handleUpdate = (e) => {
      
      console.log(update_hospital);
      e.preventDefault();
      updateHospital(update_hospital, dispatch);

    };

  return (
    <div className="hospitalInfo">
      <div className="hospitalInfoTitleContainer">
        <h1 className="hospitalInfoTitle">Hospital Inforamtion</h1>
      </div>
      <div className="hospitalInfoTop">
          <div className="hospitalInfoTopRight">
              <div className="hospitalInfoInfoTop">
                  <img src={hospitalInfo.profilePic || "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} alt="" className="hospitalInfoInfoImg" />
                  <span className="hospitalInfoName">{hospitalInfo.hospitalname}</span>
              </div>
              <div className="hospitalInfoInfoBottom">
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Id:</span>
                      <span className="hospitalInfoInfoValue" >{hospitalInfo._id}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Phone No.:</span>
                      <span className="hospitalInfoInfoValue" >{hospitalInfo.phone_number}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Email:</span>
                      <span className="hospitalInfoInfoValue" >{hospitalInfo.email}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Address:</span>
                      <span className="hospitalInfoInfoValue" >{hospitalInfo.address}</span>
                  </div>
                </div>
          </div>
      </div>
      <div className="hospitalInfoBottom">
          <form className="hospitalInfoForm">
              <div className="hospitalInfoFormLeft">
                  <label>Email</label>
                  <input type="text" placeholder="Email" name="email" onChange={handleChange}/>
                  <label>phone_number</label>
                  <input type="text" placeholder="phone_number" name="phone_number" onChange={handleChange}/>
                  <label>address</label>
                  <input type="text" placeholder="address" name="address" onChange={handleChange}/>
                  
                  <label>profile Picture</label>
                  <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" checked={toggle} onChange={handleToggle} />
                    <label style={{ background: toggle && '#06D6A0' }} className="react-switch-label" htmlFor={`react-switch-new`} >
                        <span className={`react-switch-button`} />
                    </label>
                  <input type="file" id="file" name="profilePic" onChange={(e) => setImg(e.target.files[0])}/>
              </div>
              <div className="hospitalInfoFormRight">
                  <div className="hospitalUpload">
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  {toggle ? (<button className="hospitalInfoButton" onClick={handleUpload} >Upload</button>) :
                    (<button className="hospitalInfoButton" onClick={handleUpdate}>Update</button>) }
              </div>
          </form>
      </div>
    </div>
  );
}
