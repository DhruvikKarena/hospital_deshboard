import "./userHome.css";
import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../../context/hospitalContext/HospitalContext";
import { getAllHospitals } from "../../context/hospitalContext/apiCalls";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import Navbar from "../../components/navbar/Navbar";
import ImageLoader from '../../components/imageLoader/ImageLoader';

export default function UserHome() {

    // const handleToggleInfo = (e) => {
    //     setToggleInfo(!toggleInfo);
    // }

    const useGeoLocation = () => {

        // const google="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSrUC-ViVOx6hrJqN_NIHgNAeDGKR9HME&libraries=places&callback=useGeoLocation"

        const [location , setLocation] = useState({
            loaded: false,
            coordinates: {lat:"", lng:""}
        });
        
        const [loc, setLoc] = useState(false);
        // let cr_location = {};
        // let map,service,pos;
        // map = new window.google.maps.Map();

        const onSuccess = (location) => {
            setLocation({
                loaded: true,
                coordinates: {lat: location.coords.latitude , lng: location.coords.longitude}
            });
            setLoc(true);
            // pos = { lat: location.coords.latitude, lng: location.coords.longitude }
            // console.log(pos);
            // getNearbyPlaces(pos);
        };

        // const getNearbyPlaces = (position) => {
        //     // console.log(google.maps)
        //     let request = {
        //       location: position,
        //       rankBy: window.google.maps.places.RankBy.DISTANCE,
        //       keyword: 'hospital'
        //     };
        //     map = new window.google.maps.Map();
      
        //     service = new window.google.maps.places.PlacesService(map);
        //     // console.log(service);
        //     service.nearbySearch(request, nearbyCallback);
        //   }
      
        //   // Handle the results (up to 20) of the Nearby Search
        //   const nearbyCallback = (results, status) => {
        //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        //       console.log(results);
        //     }
        //   }

        useEffect(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onSuccess);
                // console.log(location)
            }
            if(loc){
                getAllHospitals(cfr_location.coordinates, dispatch);
            }
        },[loc]);

        return location;
    }

    const {hospitals, dispatch} = useContext(HospitalContext);
    const cfr_location = useGeoLocation();

    // useEffect(() => {
        
    // }, [dispatch]);

    return (
        <>
        <Navbar />
        {/* <Wrapper apiKey={"AIzaSyCSrUC-ViVOx6hrJqN_NIHgNAeDGKR9HME"} > */}
        {cfr_location.loaded ? console.log(JSON.stringify(cfr_location)) : "nodata"}
        {/* </Wrapper> */}
      <div className="featuredForPatient">
      <img className="coverimg"
        src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
        alt=""
      />
      </div>
    <div className="hospitalListForPatient">
    {hospitals.map((hospital) => 
    <div key={hospital[0]._id} className="hospitalInfoForPatient">
    <div className="hospitalInfoItemForPatient">
        {hospital[0].profilePic !== undefined ? <ImageLoader key={hospital[0].profilePic} value={hospital[0].profilePic} varient={"circle"} /> :
        <div className="hospitalPic"><BackgroundLetterAvatar value={hospital[0].hospitalname}/></div>}
        <span className="hospitalInfoName">{hospital[0].hospitalname}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
    <span className="hospitalInfoBeds">Phone Number: </span>
        <span className="hospitalInfoBeds">{hospital[0].phone_number}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
    <span className="hospitalInfoBeds">Vacent Beds: </span>
        <span className="hospitalInfoBeds">{hospital[0].vacant_bed}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Address: </span>
            <span className="hospitalInfoBeds">{hospital[0].address}</span>
        </div>

        <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Numbers of Doctors: </span>
            <span className="hospitalInfoBeds">{hospital[0].doctors_info.length}</span>
        </div>

        <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Numbers of Patients: </span>
            <span className="hospitalInfoBeds">{hospital[0].patient_info.length}</span>
        </div>

    </div>)}
    </div>
      </>
    );
}