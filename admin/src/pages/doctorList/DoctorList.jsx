import "./doctorList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { doctorRows } from "../../dummyData";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/doctorContext/DoctorContext";
import { deleteDoctor, getDoctors } from "../../context/doctorContext/apiCalls";
import ImageLoader from '../../components/imageLoader/ImageLoader';

export default function DoctorList() {
  const [doctor, setDoctor] = useState([]);

  const { doctors, dispatch } = useContext(DoctorContext);

  useEffect(() => {
    getDoctors(dispatch);
  }, [dispatch]);

  // const handleClick = (id) => {
  //   setDoctor({ ...doctor, doctors_id: id });
  //   console.log(doctor);
  //   handleDelete();
  // };

  const handleDelete = () => {
    console.log(doctor);
    deleteDoctor(doctor, dispatch);
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "doctor",
      headerName: "Doctor",
      width: 200,
      renderCell: (params) => {
        return (
          <>
          <div className="doctorListItem">
          {/* <img className="doctorListImg" src={params.row.profilePic} alt=""/> */}
            {params.row.profilePic !== undefined ? <ImageLoader value={params.row.profilePic} varient={"circle"} /> :
            <div className="avtimgdoc"><BackgroundLetterAvatar value={params.row.username}/></div>}
          </div>
          <div className="doctorListItem">{params.row.username}</div>
          </>
        );
      },
    },
    { field: "specilized_in", headerName: "Specilization", width: 160 },
    {
      field: "Treated Patients",
      headerName: "Treated Patients",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="doctorListItem">
           {params.row.patient_history.length}
          </div>
        );
      },
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:"/doctor/" + params.row._id, doctor: params.row}}>
              <button className="doctorListEdit">Info</button>
            </Link>
            <DeleteOutline 
              className="doctorListDelete"
              onMouseEnter={() => setDoctor({ doctors_id: params.row._id })}
              onClick={handleDelete}
            />
          </>
        );
      },
    },
  ];
    

  return (
    <div className="doctorList">
      <Link to="/newdoctor">
        <button className="doctorAddButton">Add</button>
      </Link>
      <DataGrid
        rows={doctors}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
