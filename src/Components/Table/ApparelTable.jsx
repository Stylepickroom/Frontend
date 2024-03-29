import HostServer from '../../host/host'
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ApparelDataTable = () => {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedData, setEditedData] = useState({
    apparelName: '',
    apparelType: '',
    imageUrl: '',
    status: '',
  });
  const [apparels, setApparels] = useState([]);
  const [selectedApparel, setSelectedApparel] = useState(null);

  const fetchApparels = async () => {
    try {
      const merchantToken = localStorage.getItem('merchantToken');
      if (!merchantToken) {
        console.log('Authorization failed, token not found');
        return;
      }
      const response = await fetch(`${HostServer}/merchant/all-apparels/`, {
        method: 'GET',
        headers: {
          Authorization: merchantToken,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApparels(data.apparels);
      } else {
        console.error('Failed to fetch apparel data');
      }
    } catch (error) {
      console.error('Error fetching apparel data:', error);
    }
  };

  useEffect(() => {
    fetchApparels();
  }, []);

  const handleOpenImage = (event, imageUrl) => {
    event.stopPropagation();
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImage = () => {
    setOpenImageModal(false);
  };

  const handleEditClick = (row) => {
    setSelectedApparel(row);
    setEditedData(row);
    setOpenEditModal(true);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const merchantToken = localStorage.getItem('merchantToken');
      if (!merchantToken) {
        console.log('Authorization failed, token not found');
        return;
      }
      if (!selectedApparel) {
        console.log('No apparels to edit.');
        return;
      }
      const apparelID = selectedApparel.id;
      const response = await fetch(
        `${HostServer}/merchant/apparel/update/${apparelID}`,
        {
          method: 'POST',
          headers: {
            Authorization: merchantToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedData),
        },
      );

      if (response.ok) {
        setOpenEditModal(false);
        fetchApparels();
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div>
      <DataGrid
        rows={apparels}
        columns={[
          {
            field: 'id',
            headerName: 'Apparel ID',
            width: 150,
            renderCell: (params) => <div style={{ paddingLeft: '25px' }}>{params.value}</div>,
          },
          { field: 'apparelName', headerName: 'Apparel Name', width: 200 },
          { field: 'apparelType', headerName: 'Apparel Type', width: 150 },
          {
            field: 'imageUrl',
            headerName: 'Image',
            width: 200,
            renderCell: (params) => (
              <img
                src={params.value}
                alt={`Image of ${params.row.apparelName}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                onClick={(event) => handleOpenImage(event, params.value)}
              />
            ),
          },
          { field: 'uploadDate', headerName: 'Upload Date', width: 150 },
          { field: 'status', headerName: 'Status', width: 120 },
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
        open={openImageModal}
        onClose={handleCloseImage}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={selectedImage} alt='Selected' style={{ maxHeight: '90vh', maxWidth: '90vw' }} />
      </Modal>

      <Modal
        open={openEditModal}
        onClose={handleCloseEdit}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            width: 600,
            bgcolor: 'background.paper',
            p: 4,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
            borderRadius: '8px',
            '& > div': {
              marginBottom: '1rem',
            },
          }}
        >
          <Typography variant='h6' component='h2' mb={2}>
            Edit Row
          </Typography>
          {selectedApparel && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField
                label='Apparel Name'
                name='apparelName'
                fullWidth
                value={editedData.apparelName}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Apparel Type'
                name='apparelType'
                fullWidth
                value={editedData.apparelType}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Image'
                name='imageUrl'
                fullWidth
                value={editedData.imageUrl}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Status'
                name='status'
                fullWidth
                value={editedData.status}
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

export default ApparelDataTable;
