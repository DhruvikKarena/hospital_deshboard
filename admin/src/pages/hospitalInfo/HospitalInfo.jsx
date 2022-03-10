import "./hospitalInfo.css";

export default function HospitalInfo() {

    // const Button = ({ type }) => {
    //     return <button className={"hospitalInfoInfoValue " + type}>{type}</button>;
    //   };
    
    const hospitalInfo = JSON.parse(localStorage.getItem("user"));
    // console.log(hospitalInfo);

  return (
    <div className="hospitalInfo">
      <div className="hospitalInfoTitleContainer">
        <h1 className="hospitalInfoTitle">Hospital Inforamtion</h1>
      </div>
      <div className="hospitalInfoTop">
          <div className="hospitalInfoTopRight">
              <div className="hospitalInfoInfoTop">
                  <img src={"https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} alt="" className="hospitalInfoInfoImg" />
                  <span className="hospitalInfoName">{hospitalInfo.hospitalname}</span>
              </div>
              <div className="hospitalInfoInfoBottom">
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Id:</span>
                      <span className="hospitalInfoInfoValue" >{hospitalInfo._id}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Phone No.:</span>
                      <span className="hospitalInfoInfoValue" >{hospitalInfo.phone_number}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Email:</span>
                      <span className="hospitalInfoInfoValue" >{hospitalInfo.email}</span>
                  </div>
                  <div className="hospitalInfoInfoItem">
                      <span className="hospitalInfoInfoKey">Hospital Address:</span>
                      <span className="hospitalInfoInfoValue" >{hospitalInfo.address}</span>
                  </div>
                </div>
          </div>
      </div>
    </div>
  );
}
