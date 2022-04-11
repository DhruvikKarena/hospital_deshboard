import { DoctorContext } from '../../context/doctorContext/DoctorContext';
import { useContext, useState } from "react";
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import storage from "../../firebase";
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './doctorUpdate.css';
import { updateDoctor } from '../../context/doctorContext/apiCalls';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel/CircularProgressWithLabel';

export default function DoctorUpdate() {

    const [update_doctor, setUpdate_Doctor] = useState({id: JSON.parse(localStorage.getItem("user"))._id});
    const {dispatch} = useContext(DoctorContext);
    const [img, setImg] = useState(null);
    const [licenceimg, setLicenceimg] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleToggle = (e) => {
        //e.preventDefault();
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
            //   console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                setUpdate_Doctor((prev) => {
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
        if(img !== null){
            upload([
                { file: img, label: "profilePic" },
            ]);
            // console.log("img");
        }

        if(licenceimg !== null){
            upload([
                { file: licenceimg, label: "doctor_licence" },
            ]);
            // console.log("licenceimg");
        }
    };


    const handleChange = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        if(e.target.value.length > 1){
            const value = e.target.value;
            setUpdate_Doctor({ ...update_doctor, [e.target.name]: value });
        }
    };

    const handleUpdate = (e) => {
        // console.log(update_user);
        e.preventDefault();
       updateDoctor(update_doctor, dispatch);
        setUpdate_Doctor({id: JSON.parse(localStorage.getItem("user"))._id});
    };

    return (
        <>
        <div>
        <div className="editInfo">
            <span>Edit Information</span> 
        </div>
        <form className="doctorprofileinfo">
               <div className='doctorprofileedit'>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                            <div className='doctordivItem'>
                            <div className='doctordivItemtext'>
                            <label className='doctorprofileLable'>Full Name: </label>
                            <input className='doctorprofileInput' type="text" placeholder="Full Name" name="doctor_full_name" onChange={handleChange}/>
                            </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <div className='doctordivItem'>
                            <div className='doctordivItemtext'>
                                <label className='doctorprofileLable'>Email: </label>
                                <input className='doctorprofileInput' type="text" placeholder="Email" name="email" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <div className='doctordivItem'>
                            <div className='doctordivItemtext'>
                                <label className='doctorprofileLable'>Specilized In: </label>
                                <input className='doctorprofileInput' type="text" placeholder="Specilized In" name="specilized_in" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <div className='doctordivItem'>
                            <div className='doctordivItemtext'>
                                <label className='doctorprofileLable'>Blood Group: </label>
                                <input className='doctorprofileInput' type="text" placeholder="Bloode Group" name="bloode_group" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <div className='doctordivItem'>
                            <div className='doctordivItemtext'>
                                <label className='doctorprofileLable'>Age: </label>
                                <input className='doctorprofileInput' type="text" placeholder="Age" name="age" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <div className='doctordivItem'>
                            <div className='doctordivItemtext'>
                                <label className='doctorprofileLable'>Phone Number: </label>
                                <input className='doctorprofileInput' type="text" placeholder="Phone Number" name="phone_number" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={6}>
                            <div className='doctordivItem'>
                            <div className='doctordivItemtext'>
                                <label className='doctorprofileLable'>Address: </label>
                                <input className='doctorprofileInput' type="text" placeholder="Address" name="address" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={8}>
                            <div>
                            <div className='doctorp-button'>
                                    <label className='doctorprofileLable'>For Upload </label>
                                    <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" checked={toggle} onChange={handleToggle} />
                                        <label style={{ background: toggle && '#06D6A0' }} className="react-switch-label" htmlFor={`react-switch-new`} >
                                        <span className={`react-switch-button`} />
                                    </label>
                                    </div>
                            </div>
                            <div className='doctoruploadfield'>
                            <Grid item xs={4} md={4}>
                            <div className='doctordivItem'>
                                <div className='doctordivItemtext'>
                                    <label className='doctorprofileLable'>Doctor License: </label>
                                    <input className='doctorprofileInput' type="file" id="file" name="doctor_licence" onChange={(e) => setLicenceimg(e.target.files[0])}/>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4} md={4}>
                            <div className='doctordivItem'>
                                <div className='doctordivItemtext'>
                                    <label className='doctorprofileLable'>Profile Picture: </label>
                                    <input className='doctorprofileInput' type="file" id="file" name="profilePic" onChange={(e) => setImg(e.target.files[0])}/>
                                    </div>
                            </div>
                        </Grid>
                        </div>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <div className='doctordivbtn'>
                            <div className='doctordivItemtext'>
                             {toggle ? (<button className="doctorprofilebtnUpload" onClick={handleUpload}>Upload</button>) :
                             (<button className="doctorprofilebtnUpdate" onClick={handleUpdate}>Update</button>) }
                             <div className='doctorProgress'>
                             {toggle ? <CircularProgressWithLabel value={progress} /> : <></>}
                             </div>
                            </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
               </div>
        </form>
        </div>
        </>
    );
}


