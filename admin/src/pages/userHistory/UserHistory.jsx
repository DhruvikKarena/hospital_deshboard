import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './userHistory.css';
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import { useContext, useEffect, useState } from "react";
import { getPatientHistory } from "../../context/patientContext/apiCalls";
import { PatientContext } from "../../context/patientContext/PatientContext";
import Navbar from "../../components/navbar/Navbar";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import { Link } from 'react-router-dom'; 
import UserUpdate from '../userUpdate/UserUpdate';
import CircularProgress from '@mui/material/CircularProgress';
import ImageLoader from '../../components/imageLoader/ImageLoader';
import { AuthContext } from "../../context/authContext/AuthContext";
import { UserContext } from '../../context/userContext/UserContext';

export default function UserHistory() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'black',    
      }));


    const { patients, dispatch } = useContext(PatientContext);
    const { user } = useContext(AuthContext);
    const { users } = useContext(UserContext);
    const [toggleedit, setToggleedit] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const imgloader = () => {
        setLoaded(true);
    };

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
        {user.profilePic !== undefined ? 
        <>
        <img className="profilePic" src={users[0] !== undefined ? users[0].profilePic : user.profilePic} alt="" onLoad={imgloader}/> 
        {!loaded && <div className="profilePicProcess"><CircularProgress sx={{ color: '#11b82d' }} /> </div>}
        </> :
        <div className='imgavt'><BackgroundLetterAvatar value={user.full_name} /></div>}
            <h1 className="profileName">{users[0] !== undefined ? users[0].full_name : user.full_name}</h1>
        <ModeEditIcon sx={{ fontSize: 38 }} className='editbtn' onClick={handleToggleedit}/>
        </div>
        <div className="profileinfo">
            <div className="profileGrid">
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                <Item elevation={0} >
                    <span className="profileinfoItem">UserName: </span>
                    <span className="profileinfoItem">{users[0] !== undefined ? users[0].full_name : user.full_name} </span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Age: </span> 
                <span className="profileinfoItem">{users[0] !== undefined ? users[0].age : user.age}</span></Item>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                <Item elevation={0}> 
                <span className="profileinfoItem">ID: </span> 
                <span className="profileinfoItem">{users[0] !== undefined ? users[0]._id : user._id}</span></Item>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                <Item elevation={0}>
                <span className="profileinfoItem">Email: </span> 
                <span className="profileinfoItem">{users[0] !== undefined ? users[0].email : user.email}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Blood Group: </span> 
                <span className="profileinfoItem">{users[0] !== undefined ? users[0].bloode_group : user.bloode_group}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Phone Number: </span> 
                <span className="profileinfoItem">{users[0] !== undefined ? users[0].phone_number : user.phone_number}</span></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Address: </span> 
                <span className="profileinfoItem">{users[0] !== undefined ? users[0].address : user.address}</span></Item>
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
                <Grid item xs={12} md={12} sm={6}>
                <Item elevation={0}> 
                <span className="profileinfoItem">Photos Of Reports: </span> </Item>
                <div></div>
                <Item elevation={0}>
                <div className="boximgdiv1"> 
                {history.photos_of_reports.length !== 0 ? history.photos_of_reports.map((photos_of_report) =>(<ImageLoader key={photos_of_report} value={photos_of_report} />)) :
                <span className="profileinfoItem">No Photos Avaliable </span>}
                </div>
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