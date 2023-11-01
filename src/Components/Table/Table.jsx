import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Typography } from '@mui/material';

const Dummycolumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const Dummyrows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 52 },
  { id: 6, lastName: 'Melisandre', firstName: 'Vergera', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const DataTable = () => {
  const [editRow, setEditRow] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEditClick = (row) => {
    setEditRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DataGrid
        disableRowSelectionOnClick
        rows={Dummyrows}
        columns={[
          ...Dummycolumns,
          {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
              <button
                onClick={() => handleEditClick(params.row)}
                style={{ background: 'lightblue', border: 'none', cursor: 'pointer' }}
              >
                Edit
              </button>
            ),
          },
        ]}
        pageSize={5}
        checkboxSelection
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
            borderRadius: '8px',
          }}
        >
          <Typography variant='h6' component='h2' mb={2}>
            Edit Row
          </Typography>
          {editRow && (
            <div>
              <Typography mb={1}>ID: {editRow.id}</Typography>
              <Typography mb={1}>First Name: {editRow.firstName}</Typography>
              <Typography mb={1}>Last Name: {editRow.lastName}</Typography>
              <Typography>Age: {editRow.age}</Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default DataTable;
