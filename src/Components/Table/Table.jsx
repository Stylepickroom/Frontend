import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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

  const [editedData, setEditedData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    age: '',
  });

  const handleEditClick = (row) => {
    setEditRow(row);
    setEditedData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    setEditedData((prev) => {
      const updatedData = [...Dummyrows];
      const index = updatedData.findIndex((row) => row.id === prev.id);
      if (index !== -1) {
        updatedData[index] = { ...prev };
      }
      return prev;
    });
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
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <EditIcon />
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
            width: 600, // Increased width
            bgcolor: 'background.paper',
            p: 4,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
            borderRadius: '8px',
            '& > div': {
              marginBottom: '1rem', // Added spacing between inputs
            },
          }}
        >
          <Typography variant='h6' component='h2' mb={2}>
            Edit Row
          </Typography>
          {editRow && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField
                label='ID'
                name='id'
                fullWidth
                value={editedData.id}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='First Name'
                name='firstName'
                fullWidth
                value={editedData.firstName}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Last Name'
                name='lastName'
                fullWidth
                value={editedData.lastName}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Age'
                name='age'
                fullWidth
                value={editedData.age}
                onChange={handleInputChange}
                variant='outlined'
              />
              <Button variant='contained' color='primary' onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default DataTable;
