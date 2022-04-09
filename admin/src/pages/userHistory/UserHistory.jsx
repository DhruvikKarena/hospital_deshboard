import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './userHistory.css';
import BackgroundLetterAvatar, { getname } from "../../components/avatar/Avatar";
import { useContext, useEffect, useState } from "react";
import { getPatientHistory } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";
import Navbar from "../../components/navbar/Navbar";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import { Link } from 'react-router-dom'; 
import UserUpdate from '../userUpdate/UserUpdate';

export default function UserHistory() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'black',    
      }));


    const { patients, dispatch } = useContext(PatientContext);
    const [toggleedit, setToggleedit] = useState(false);

    const handleToggleedit = (e) => {
        setToggleedit(!toggleedit);
    };

    useEffect(() => {
        getPatientHistory(dispatch);
    }, [dispatch]);

    return (
        <>
        <Navbar />
        <div className="userInfo">
        <div className="profile">
        {JSON.parse(localStorage.getItem("user")).profilePic !== undefined ? <img className="profilePic" src={JSON.parse(localStorage.getItem("user")).profilePic} alt=""/> :
        <div className='imgavt'><BackgroundLetterAvatar {...getname(JSON.parse(localStorage.getItem("user")).full_name)} /></div>}
            <h1 className="profileName">{JSON.parse(localStorage.getItem("user")).full_name}</h1>
        <ModeEditIcon sx={{ fontSize: 38 }} className='editbtn' onClick={handleToggleedit}/>
        </div>
        <div className="profileinfo">
            <div className="profileGrid">
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                <Item elevation={0} >
                    <span className="profileinfoItem">UserName: </span>
                    <span className="profileinfoItem">{JSON.parse(localStorage.getItem("user")).full_name} </span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}>
                <span className="profileinfoItem">Email: </span> 
                <span className="profileinfoItem">{JSON.parse(localStorage.getItem("user")).email}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Age: </span> 
                <span className="profileinfoItem">{JSON.parse(localStorage.getItem("user")).age}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Blood Group: </span> 
                <span className="profileinfoItem">{JSON.parse(localStorage.getItem("user")).bloode_group}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Phone Number: </span> 
                <span className="profileinfoItem">{JSON.parse(localStorage.getItem("user")).phone_number}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Address: </span> 
                <span className="profileinfoItem">{JSON.parse(localStorage.getItem("user")).address}</span></Item>
                </Grid>
            </Grid>
            </Box>
            </div>    
        </div>
        {toggleedit ? <UserUpdate /> : <div></div>}
        <div className="medicalHistory">
            <span>Medical History</span>
        </div>
        <div>
       {patients.map((history) => ( 
       <div key={history._id} className="historyList">
        <div className="historyDetail">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                <Item elevation={0} >
                    <span className="profileinfoItem">Doctor Name: </span>
                    <span className="profileinfoItem">{history.doctor_name} </span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}>
                <span className="profileinfoItem">Hospital Name: </span> 
                <span className="profileinfoItem">{history.hospitalname}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Cause Of Illness: </span> 
                <span className="profileinfoItem">{history.cause_of_illness}</span></Item>
                </Grid>
                <Grid item xs={6} md={8}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Medicines: </span> 
                <span className="profileinfoItem">{history.medicines.map((medicine) => medicine+"  ")}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Amount: </span> 
                <span className="profileinfoItem">{history.amount}</span></Item>
                </Grid>
                <Grid item xs={6} md={6}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Description: </span> 
                <span className="profileinfoItem">{history.description}</span></Item>
                </Grid>
                <Grid item xs={6} md={12}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Photos Of Reports: </span> </Item>
                <Item elevation={0}> 
                {history.photos_of_reports.length !== 0 ? history.photos_of_reports.map((photos_of_report) =>(<img key={photos_of_report} src={photos_of_report} alt="" className="historyImg" />)) :
                <span className="profileinfoItem">No Photos Avaliable </span>}
                 </Item>
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