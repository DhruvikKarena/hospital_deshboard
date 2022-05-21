import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useContext, useEffect, useState } from "react";
import "./doctorHome.css";
import DoctorNavbar from "../../components/doctorNavbar/DoctorNavbar";
import DoctorUpdate from "../doctorUpdate/DoctorUpdate";
import { getDocPatientHistory } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from "../../context/authContext/AuthContext";
import { DoctorContext } from '../../context/doctorContext/DoctorContext';
import ImageLoader from '../../components/imageLoader/ImageLoader';

export default function DoctorHome() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'black',    
      }));

    const { user } = useContext(AuthContext);
    const { doctors } = useContext(DoctorContext);
    const [toggleedit, setToggleedit] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { patients, dispatch } = useContext(PatientContext);

    const handleToggleedit = (e) => {
        setToggleedit(!toggleedit);
    };

    const imgloader = () => {
        setLoaded(true);
    };

    useEffect(() => {
        getDocPatientHistory(dispatch);
    }, [dispatch]);

    return (
        <>
            <DoctorNavbar />
            <div className="doctorInfo">
                <div className="doctorprofile">
                {user.profilePic === undefined ? 
                <div className='doctorimgavt'><BackgroundLetterAvatar value={user.doctor_full_name} /></div> :
                <>
                <img className="doctorprofilePic" src={doctors[0] !== undefined ? doctors[0].profilePic : user.profilePic} alt="" onLoad={imgloader}/> 
                {!loaded && <div className="doctorprofileProcess"><CircularProgress sx={{ color: '#11b82d' }} /> </div>}</> }
                <h1 className="doctorprofileName">{doctors[0] !== undefined ? doctors[0].doctor_full_name : user.doctor_full_name}</h1>
                <ModeEditIcon sx={{ fontSize: 38 }} className='doctoreditbtn' onClick={handleToggleedit}/>
            </div>
            <div className="doctorprofileinfo">
                <div className="doctorprofileGrid">
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0} >
                        <span className="doctorprofileinfoItem">Full Name: </span>
                        <span className="doctorprofileinfoItem">{doctors[0] !== undefined ? doctors[0].doctor_full_name : user.doctor_full_name} </span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0} >
                        <span className="doctorprofileinfoItem">Specilization: </span>
                        <span className="doctorprofileinfoItem">{doctors[0] !== undefined ? doctors[0].specilized_in : user.specilized_in} </span></Item>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                    <Item elevation={0} >
                        <span className="doctorprofileinfoItem">ID: </span>
                        <span className="doctorprofileinfoItem">{doctors[0] !== undefined ? doctors[0]._id : user._id} </span></Item>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                    <Item elevation={0}>
                    <span className="doctorprofileinfoItem">Email: </span> 
                    <span className="doctorprofileinfoItem">{doctors[0] !== undefined ? doctors[0].email : user.email}</span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Age: </span> 
                    <span className="doctorprofileinfoItem">{doctors[0] !== undefined ? doctors[0].age : user.age}</span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Blood Group: </span> 
                    <span className="doctorprofileinfoItem">{doctors[0] !== undefined ? doctors[0].bloode_group : user.bloode_group}</span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Phone Number: </span> 
                    <span className="doctorprofileinfoItem">{doctors[0] !== undefined ? doctors[0].phone_number : user.phone_number}</span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Address: </span> 
                    <span className="doctorprofileinfoItem">{doctors[0] !== undefined ? doctors[0].address : user.address}</span></Item>
                    </Grid>
                    <Grid item xs={12} md={12} sm={6}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Doctor Licence: </span> </Item>
                    <div className='licencePhoto'>
                    <Item elevation={0}> 
                    {/* <img key={licence} src={licence} alt="" className="historyImg" /> */}
                    <div className="boximgdiv1">
                    {user.doctor_licence.length !== 0 ? 
                    user.doctor_licence.map((licence) =>(<ImageLoader key={licence} value={licence} />)) :
                    <span className="doctorprofileinfoItem">No Photos Avaliable </span>}
                    </div>
                    </Item>
                    </div>
                    </Grid>
                </Grid>
                </Box>
                </div>    
            </div>
            {toggleedit ? <DoctorUpdate /> : <div></div>}
            <div className="medicalHistory">
                <span>Patients History</span>
            </div>
            <div>
       {patients.map((history) => ( 
       <div key={history._id} className="historyList">
        <div className="historyDetail">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                <Item elevation={0} >
                    <span className="doctorprofileinfoItem">Patient Name: </span>
                    <span className="doctorprofileinfoItem">{history.patient_name} </span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}>
                <span className="doctorprofileinfoItem">Hospital Name: </span> 
                <span className="doctorprofileinfoItem">{history.hospitalname}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="doctorprofileinfoItem">Cause Of Illness: </span> 
                <span className="doctorprofileinfoItem">{history.cause_of_illness}</span></Item>
                </Grid>
                <Grid item xs={6} md={8}>
                <Item elevation={0}> 
                <span className="doctorprofileinfoItem">Medicines: </span> 
                <span className="doctorprofileinfoItem">{history.medicines.map((medicine) => medicine+"  ")}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="doctorprofileinfoItem">Amount: </span> 
                <span className="doctorprofileinfoItem">{history.amount}</span></Item>
                </Grid>
                <Grid item xs={6} md={6}>
                <Item elevation={0}> 
                <span className="doctorprofileinfoItem">Description: </span> 
                <span className="doctorprofileinfoItem">{history.description}</span></Item>
                </Grid>
                <Grid item xs={12} md={12} sm={6}>
                <Item elevation={0}> 
                <span className="doctorprofileinfoItem">Photos Of Reports: </span> </Item>
                <div className='licencePhoto'>
                <Item elevation={0}>
                <div className="boximgdiv1"> 
                {history.photos_of_reports.length !== 0 ? history.photos_of_reports.map((photos_of_report) =>(<ImageLoader key={photos_of_report} value={photos_of_report} />)) :
                <span className="doctorprofileinfoItem">No Photos Avaliable </span>}
                </div>
                 </Item>
                 </div>
                </Grid>
            </Grid>
            </Box>
        </div>

        </div>))}
        </div>
            </div>
        </>
    );
}