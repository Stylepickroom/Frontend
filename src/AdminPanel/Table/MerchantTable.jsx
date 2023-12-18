import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';

const MerchantTable = () => {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    merchantName: '', 
    merchantType: '', 
    status: '', 
  });
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const fetchMerchants = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken')
      if (!adminToken){
        console.log('Authorization failed, token not found')
        return 
      }
      const response = await fetch('https://node-backend.up.railway.app/admin/merchants/', {
        method: 'GET',
        headers: {
          'Authorization': adminToken,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.merchants);
        const merchantsWithId = data.merchants.map((merchant) => ({
          ...merchant,
          id: merchant.merchantID, // Replace with the appropriate unique identifier from your data
        }));
        setMerchants(merchantsWithId);
      } else {
        console.error('Failed to fetch apparel data');
      }
    } catch (error) {
      console.error('Error fetching apparel data:', error);
    }
  };
  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleEditClick = (row) => {
    setSelectedMerchant(row);
    setEditedData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken')
      if (!adminToken){
        console.log('Authorization failed, token not found')
        return 
      }
      if (!setSelectedMerchant) {
        console.log("No Merchants to edit.")
        return
      }
      const merchantID = setSelectedMerchant.id
      const response = await fetch(`https://node-backend.up.railway.app/admin/merchant/edit/${merchantID}`, {
        method: 'POST',
        headers: {
          'Authorization': adminToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        setOpen(false);
        fetchMerchants();
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
        rows={merchants}
        columns={[
          { field: 'id', headerName: 'Merchant ID', width: 150, renderCell: (params) => <div style={{ paddingLeft: '25px' }}>{params.value}</div> },
          { field: 'merchantName', headerName: 'Merchant Name', width: 200 },
          { field: 'merchantLocation', headerName: 'Location', width: 150 },
          { field: 'merchantPricingEnded', headerName: 'Plan Ended', width: 150 },
          { field: 'merchantPricingStarted', headerName: 'Plan Started', width: 150 },
          { field: 'merchantActive', headerName: 'Status', width: 120 },
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
        <Box sx={{
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
          {selectedMerchant && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField
                label='Merchant Name'
                name='merchantName'
                fullWidth
                value={editedData.merchantName}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Merchant Type'
                name='merchantType'
                fullWidth
                value={editedData.apparelType}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Status'
                name='merchantActive'
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

export default MerchantTable;
