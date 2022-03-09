import "./widgetLg.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetLg() {
  const [latestPaitents, setLatestPaitents] = useState([]);

  useEffect(() => {
    const getLatestPaitents = async () => {
      try{

        const res = await axios.get("/hospital/findPatients/"+JSON.parse(localStorage.getItem("user"))._id, {
          headers: {
            token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setLatestPaitents(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getLatestPaitents();
  },[])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Paitents</h3>
      <table className="widgetLgTable">
        <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Paitents</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Illness</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {latestPaitents.map((latestPaitents) => ( 
        <tr  key={latestPaitents._id} className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{latestPaitents.patient_name}</span>
          </td>
          <td className="widgetLgDate">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(latestPaitents.createdAt)))}</td>
          <td className="widgetLgAmount">{latestPaitents.cause_of_illness}</td>
          <td className="widgetLgStatus">
            {latestPaitents.isActive ? <Button type="Active" /> : <Button type="Closed" /> }
          </td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}