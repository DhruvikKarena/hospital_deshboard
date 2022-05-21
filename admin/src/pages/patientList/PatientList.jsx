import "./patientList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../context/patientContext/PatientContext";
import { deletePatient, getPatients } from "../../context/patientContext/apiCalls";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";

export default function PatientList() {

  const { patients, dispatch } = useContext(PatientContext);

  useEffect(() => {
    getPatients(dispatch);
  }, [dispatch]);

  const Button = ({ type }) => {
    return <button className={"patientListItem " + type}>{type}</button>;
  };

  const handleDelete = (id) => {
    deletePatient(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "patient",
      headerName: "Patient",
      width: 200,
      renderCell: (params) => {
        return (
          <>
          <div className="patientListItem">
            {params.row.profilePic !== undefined ? <img className="doctorListImg" src={params.row.profilePic} alt=""/> :
            <div className="avtimgdoc"><BackgroundLetterAvatar value={params.row.patient_name}/></div>}
          </div>
          <div className="patientListItem">{params.row.patient_name}</div>
          </>
        );
      },
    },
    { field: "date", headerName: "Date", width: 200, 
    renderCell: (params) => {
      return (
        <div className="patientListItem">
          {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(params.row.createdAt)))}
        </div>
      );
    },
  },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="patientListItem">
           {params.row.isActive ? <Button type="Active" /> : <Button type="Closed" /> }
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:"/patient/" + params.row._id, patient: params.row}}>
              <button className="patientListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="patientListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="patientList">
      <Link to="/newpatient">
        <button className="patientAddButton">Create</button>
      </Link>
      <DataGrid
        rows={patients}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
