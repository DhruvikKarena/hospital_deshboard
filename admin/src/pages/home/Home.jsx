import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
  const MONTHS =useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],[]
  );

  const [userStates, setUserStates] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      try {
        const res = await axios.get("/hospital/stats/"+JSON.parse(localStorage.getItem("user"))._id, {
          headers: {
            token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const patientsList = res.data.sort(function(a,b){
          return a._id - b._id;
        });
        patientsList.map((item) => setUserStates((prev) => [...prev,{name:MONTHS[item._id-1], "Total Patients": item.total},]));
      } catch (err){
        console.log(err);
      }
    };
    getStates();
  },[MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStates} title="User Analytics" grid dataKey="Total Patients"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
