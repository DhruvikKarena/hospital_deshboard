import "./patientList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { PatientRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../context/patientContext/PatientContext";
import { deletePatient, getPatients } from "../../context/patientContext/apiCalls";

export default function PatientList() {
  //const [data, setData] = useState(PatientRows);

  const { patients, dispatch } = useContext(PatientContext);

  useEffect(() => {
    getPatients(dispatch);
  }, [dispatch]);

  const Button = ({ type }) => {
    return <button className={"patientListItem " + type}>{type}</button>;
  };

  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
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
          <div className="patientListItem">
            <img className="patientListImg" src={params.row.img || "https://i.guim.co.uk/img/media/d31ebd49b32a5aa609a584ababb1e03bc70b4942/573_213_2929_1758/master/2929.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=5b27f1f7a463408ae8fffac0bbda95a5"} alt="" />
            {params.row.patient_name}
          </div>
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
