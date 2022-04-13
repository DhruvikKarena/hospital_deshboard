import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BackgroundLetterAvatar, { getname } from "../../components/avatar/Avatar";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useContext, useEffect, useState } from "react";
import "./doctorHome.css";
import DoctorNavbar from "../../components/doctorNavbar/DoctorNavbar";
import DoctorUpdate from "../doctorUpdate/DoctorUpdate";
import { getDocPatientHistory } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";

export default function DoctorHome() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'black',    
      }));
      
    const [toggleedit, setToggleedit] = useState(false);
    const { patients, dispatch } = useContext(PatientContext);

    const doctor_info = JSON.parse(localStorage.getItem("user"));

    const handleToggleedit = (e) => {
        setToggleedit(!toggleedit);
    };

    useEffect(() => {
        getDocPatientHistory(dispatch);
    }, [dispatch]);

    return (
        <>
            <DoctorNavbar />
            <div className="doctorInfo">
                <div className="doctorprofile">
                {JSON.parse(localStorage.getItem("user")).profilePic !== undefined ? <img className="doctorprofilePic" src={JSON.parse(localStorage.getItem("user")).profilePic} alt=""/> :
                <div className='doctorimgavt'><BackgroundLetterAvatar {...getname(JSON.parse(localStorage.getItem("user")).doctor_full_name)} /></div>}
                    <h1 className="doctorprofileName">{JSON.parse(localStorage.getItem("user")).doctor_full_name}</h1>
                <ModeEditIcon sx={{ fontSize: 38 }} className='doctoreditbtn' onClick={handleToggleedit}/>
            </div>
            <div className="doctorprofileinfo">
                <div className="doctorprofileGrid">
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0} >
                        <span className="doctorprofileinfoItem">Full Name: </span>
                        <span className="doctorprofileinfoItem">{doctor_info.doctor_full_name} </span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0} >
                        <span className="doctorprofileinfoItem">Specilization: </span>
                        <span className="doctorprofileinfoItem">{JSON.parse(localStorage.getItem("user")).specilized_in} </span></Item>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                    <Item elevation={0}>
                    <span className="doctorprofileinfoItem">Email: </span> 
                    <span className="doctorprofileinfoItem">{JSON.parse(localStorage.getItem("user")).email}</span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Age: </span> 
                    <span className="doctorprofileinfoItem">{JSON.parse(localStorage.getItem("user")).age}</span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Blood Group: </span> 
                    <span className="doctorprofileinfoItem">{JSON.parse(localStorage.getItem("user")).bloode_group}</span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Phone Number: </span> 
                    <span className="doctorprofileinfoItem">{JSON.parse(localStorage.getItem("user")).phone_number}</span></Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Address: </span> 
                    <span className="doctorprofileinfoItem">{JSON.parse(localStorage.getItem("user")).address}</span></Item>
                    </Grid>
                    <Grid item xs={12} md={12} sm={6}>
                    <Item elevation={0}> 
                    <span className="doctorprofileinfoItem">Doctor Licence: </span> </Item>
                    <div className='licencePhoto'>
                    <Item elevation={0}> 
                    {doctor_info.doctor_licence.length !== 0 ? doctor_info.doctor_licence.map((licence) =>(<img key={licence} src={licence} alt="" className="historyImg" />)) :
                    <span className="doctorprofileinfoItem">No Photos Avaliable </span>}
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
                {history.photos_of_reports.length !== 0 ? history.photos_of_reports.map((photos_of_report) =>(<img key={photos_of_report} src={photos_of_report} alt="" className="historyImg" />)) :
                <span className="doctorprofileinfoItem">No Photos Avaliable </span>}
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