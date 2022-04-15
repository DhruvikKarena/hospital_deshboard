import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { useState } from "react";
import './imageLoader.css';

export default function ImageLoader(props){
    
    const [loaded, setLoaded] = useState(false);

    const imgloader = () => {
        setLoaded(true);
    };

    return(
        <>
        <img className="boximg" src={props.value} alt="" onLoad={imgloader}/> 
        {!loaded && <div className="boximgProcess"><CircularProgress sx={{ color: '#11b82d' }} /> </div>}
        </>
    )
}

ImageLoader.propTypes = {
    value: PropTypes.string.isRequired,
};