import { UserContext } from '../../context/userContext/UserContext';
import { useContext, useState } from "react";
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import storage from "../../firebase";
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './userUpdate.css';
import { updateUser } from '../../context/userContext/apiCalls';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel/CircularProgressWithLabel';

export default function UserUpdate() {

    // const Item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: 'black',     
    //   }));

    const [update_user, setUpdate_User] = useState({id: JSON.parse(localStorage.getItem("user"))._id});
    const {dispatch} = useContext(UserContext);
    const [img, setImg] = useState(null);
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
                setUpdate_User((prev) => {
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
        e.preventDefault();
        // console.log(e.target.value.length)
        if(e.target.value.length > 1){
            const value = e.target.value;
            setUpdate_User({ ...update_user, [e.target.name]: value });
        }
    };

    const handleUpdate = (e) => {
        // console.log(update_user);
        e.preventDefault();
       updateUser(update_user, dispatch);
        setUpdate_User({id: JSON.parse(localStorage.getItem("user"))._id});
    };

    return (
        <>
        <div>
        <div className="editInfo">
            <span>Edit Information</span> 
        </div>
        <form className="profileinfo">
               <div className='profileedit'>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} sm={6}>
                            <div className='divItem'>
                            <div className='divItemtext'>
                            <label className='profileLable'>Full Name: </label>
                            <input className='profileInput' type="text" placeholder="Full Name" name="full_name" onChange={handleChange}/>
                            </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                        <div className='divItem'>
                            <div className='divItemtext'>
                                <label className='profileLable'>Email: </label>
                                <input className='profileInput' type="text" placeholder="Email" name="email" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                        <div className='divItem'>
                            <div className='divItemtext'>
                                <label className='profileLable'>Blood Group: </label>
                                <input className='profileInput' type="text" placeholder="Bloode Group" name="bloode_group" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                        <div className='divItem'>
                            <div className='divItemtext'>
                                <label className='profileLable'>Age: </label>
                                <input className='profileInput' type="text" placeholder="Age" name="age" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                        <div className='divItem'>
                            <div className='divItemtext'>
                                <label className='profileLable'>Phone Number: </label>
                                <input className='profileInput' type="text" placeholder="Phone Number" name="phone_number" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                            <div className='divItem'>
                            <div className='divItemtext'>
                                <label className='profileLable'>Address: </label>
                                <input className='profileInput' type="text" placeholder="Address" name="address" onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                        <div className='divItem'>
                            <div className='divItemtext'>
                                <div className='p-button'>
                                <label className='profileLable'>Profile Picture: </label>
                                <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" checked={toggle} onChange={handleToggle} />
                                    <label style={{ background: toggle && '#06D6A0' }} className="react-switch-label" htmlFor={`react-switch-new`} >
                                    <span className={`react-switch-button`} />
                                </label>
                                </div>
                                <div className='divItemtext'>
                                <input className='profileInput' type="file" id="file" name="profilePic" onChange={(e) => setImg(e.target.files[0])}/>
                                </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                        <div className='divItem'>
                            <div className='divItemtext'>
                             {toggle ? (<button className="profilebtnUpload" onClick={handleUpload} >Upload</button>) :
                             (<button className="profilebtnUpdate" onClick={handleUpdate}>Update</button>) }
                             <div className='patientProgress'>
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


