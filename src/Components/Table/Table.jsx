import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const Dummycolumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    renderCell: (params) => (
      <button
        onClick={() => console.log("Button Clicked")}
        style={{ background: "lightblue", border: "none", cursor: "pointer" }}
      >
        Edit
      </button>
    ),
  },
];

const Dummyrows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 52 },
  { id: 6, lastName: "Melisandre", firstName: "Vergera", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DataTable = () => {
  const [editRow, setEditRow] = useState(null);

  // Function to handle the "Edit" button click
  const handleEditClick = (row, event) => {
    event.stopPropagation();
    setEditRow(row);
  };
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 6,
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        disableRowSelectionOnClick
        {...data}
        rows={Dummyrows}
        columns={Dummycolumns}
        initialState={{
          pagination: {
            //The table will have 5 rows in one page, just for example.
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
export default DataTable;

