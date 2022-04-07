import { Link } from "react-router-dom";
// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './userHistory.css';
import { useContext, useEffect } from "react";
import { getPatientHistory } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";

export default function UserHistory() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'black',    
      }));

    const { patients, dispatch } = useContext(PatientContext);
    // const [histories, setHistories] = useState([]);

    useEffect(() => {
        getPatientHistory(dispatch);
    }, [dispatch]);

    return (
        <>
        <div className= "navbar">
        <div className="container">
          <div className="left">
          <Link to="/patientpage" className="link"><span>Home</span></Link>
          </div>
          <div className="right">
            <Link to={"/userhistory"} className="link"><span>History</span></Link>
            <span>Logout</span>
          </div>
        </div>
        </div>

        <div className="userInfo">
        <div className="profile">
            <img className="profilePic" src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg" alt=""/>
            <h1 className="profileName">Devid</h1>
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
                <span className="profileinfoItem">23</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Blood Group: </span> 
                <span className="profileinfoItem">B+</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Phone Number: </span> 
                <span className="profileinfoItem">4567328897</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Address: </span> 
                <span className="profileinfoItem">laptoop</span></Item>
                </Grid>
            </Grid>
            </Box>
            </div>    
        </div>
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