import "./featuredInfo.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
import {  ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  
  // const [hospital, setHospital] = useState([]);

  // useEffect(() => {
  //   const getHospital = async () => {
  //     try{

  //       const res = await axios.get("/hospital/find/"+JSON.parse(localStorage.getItem("user"))._id, {
  //         headers: {
  //           token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //         },
  //       });
  //       setHospital(res.data);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   };
  //   getHospital();
  // },[])

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Vacant Beds</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{JSON.parse(localStorage.getItem("user")).vacant_bed}</span>
          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Beds</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{JSON.parse(localStorage.getItem("user")).total_bed}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
