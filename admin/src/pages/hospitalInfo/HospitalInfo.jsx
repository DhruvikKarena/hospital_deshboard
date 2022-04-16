import { useState, useContext } from "react";
import "./hospitalInfo.css";
import storage from "../../firebase";
import { HospitalContext } from "../../context/hospitalContext/HospitalContext";
import { updateHospital } from "../../context/hospitalContext/apiCalls";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel/CircularProgressWithLabel';
import ImageLoader from '../../components/imageLoader/ImageLoader';

export default function HospitalInfo() {

    const hospitalInfo = JSON.parse(localStorage.getItem("user"));
    const [update_hospital, setUpdate_Hospital] = useState({id: hospitalInfo._id});

    const {hospitals, dispatch} = useContext(HospitalContext);
    const [img, setImg] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [progress, setProgress] = useState(0);
    // console.log(hospitalInfo);

    const handleToggle = (e) => {
      //e.preventDefault();
      setToggle(!toggle);
      setProgress(0);
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
              setProgress(progress);
            // console.log("Upload is " + progress + "% done");
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
      // console.log(e.target.name);
          //console.log("in 2 if")
          const value = e.target.value;
          setUpdate_Hospital({ ...update_hospital, [e.target.name]: value });
          // console.log("value "+value);
          // console.log(typeof(value));

      // setUpdate_hospital({ ...update_hospital, vacant_beds: hospital.vacant_bed });
    };


  const handleUpdate = (e) => {
      
      // console.log(update_hospital);
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
                  <div className="hospitalInfoInfoImg">
                    {hospitalInfo.profilePic !== undefined ? 
                    <ImageLoader value={hospitals[0] !== undefined ? hospitals[0].profilePic : hospitalInfo.profilePic} varient={"circle"} /> :
                    <div className="avtimgdoc"><BackgroundLetterAvatar value={hospitals[0] !== undefined ? hospitals[0].hospitalname : hospitalInfo.hospitalname}/></div>}
                  </div>
                  <span className="hospitalInfoName">{hospitals[0] !== undefined ? hospitals[0].hospitalname : hospitalInfo.hospitalname}</span>
              </div>
              <div className="hospitalInfoInfoBottom">
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Id:</span>
                      <span className="hospitalInfoInfoValue" >{hospitals[0] !== undefined ? hospitals[0]._id : hospitalInfo._id}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Phone No.:</span>
                      <span className="hospitalInfoInfoValue" >{hospitals[0] !== undefined ? hospitals[0].phone_number : hospitalInfo.phone_number}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Email:</span>
                      <span className="hospitalInfoInfoValue" >{hospitals[0] !== undefined ? hospitals[0].email : hospitalInfo.email}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Address:</span>
                      <span className="hospitalInfoInfoValue" >{hospitals[0] !== undefined ? hospitals[0].address : hospitalInfo.address}</span>
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
                    <div className='doctorProgress'>
                      {toggle ? <CircularProgressWithLabel value={progress} /> : <></>}
                    </div>
              </div>
          </form>
      </div>
    </div>
  );
}
