/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; //for this use "npm install react-datepicker"

const MerchantTable = () => {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    merchantName: '',
    merchantType: '',
    status: '',
  });
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCheckboxClick = (params) => {
    const selectedRows = params.api.getSelectedRows();
    if (selectedRows.length > 0 && selectedRows[0].id === params.row.id) {
      // If the row is already selected, unselect it on checkbox click
      params.api.deselectRow(params.row.id);
    } else {
      // Otherwise, select the row on checkbox click
      params.api.selectRow(params.row.id, true);
    }
  };
  const handleMerchantIDClick = (merchantID) => {
    // we can add logic to navigate to another window or perform other actions here
    console.log(`Merchant ID ${merchantID} clicked`);
  };

  const fetchMerchants = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        console.log('Authorization failed, token not found');
        return;
      }
      const response = await fetch('https://node-backend.up.railway.app/admin/merchants/', {
        method: 'GET',
        headers: {
          Authorization: adminToken,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const merchantsWithId = data.merchants.map((merchant) => ({
          ...merchant,
          id: merchant.merchantID,
        }));
        setMerchants(merchantsWithId);
      } else {
        console.error('Failed to fetch Merchant data');
      }
    } catch (error) {
      console.error('Error fetching Merchant data:', error);
    }
  };
  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

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
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        console.log('Authorization failed, token not found');
        return;
      }
      if (!selectedMerchant) {
        console.log('No Merchants to edit.');
        return;
      }

      const formData = new FormData();
      formData.append('name', editedData.merchantName);
      formData.append('type', editedData.merchantType);
      formData.append('email', editedData.merchantEmail);
      formData.append('location', editedData.merchantLocation);
      formData.append('theme', editedData.merchantColourTheme);
      formData.append('designation', editedData.merchantDesignation);
      formData.append('status', editedData.merchantActive);
      formData.append('file', selectedFile);

      const merchantID = selectedMerchant.id;
      const response = await fetch(
        `https://node-backend.up.railway.app/admin/merchant/edit/${merchantID}`,
        {
          method: 'POST',
          headers: {
            Authorization: adminToken,
          },
          body: formData,
        },
      );

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
          {
            field: 'id',
            headerName: 'Merchant ID',
            width: 150,
            renderCell: (params) => (
              <div
                style={{ cursor: 'pointer', color: 'blue', paddingLeft: '0px' }}
                onClick={() => handleMerchantIDClick(params.row.id)}
              >
                {params.value}
              </div>
            ),
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'merchantImagePath',
            headerName: 'Merchant Logo',
            width: 150,
            renderCell: (params) => (
              <div style={{ paddingLeft: '0px' }}>
                {params.value}
                <img
                  src={params.value} // 'merchantImagePath' contains the image URL
                  alt='Merchant Logo'
                  style={{ width: '25px', height: '60px' }}
                />
              </div>
            ),
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'merchantName',
            headerName: 'Merchant Name',
            width: 200,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'merchantLocation',
            headerName: 'Location',
            width: 150,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'merchantPricingStarted',
            headerName: 'Plan Started',
            width: 150,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'merchantPricingEnded',
            headerName: 'Plan Ended',
            width: 150,
            headerAlign: 'center',
            align: 'center',
          },

          {
            field: 'merchantActive',
            headerName: 'Status',
            width: 100,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'merchantTheme',
            headerName: 'Colour Theme',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.merchantColourTheme,
          },
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
            headerAlign: 'center',
            align: 'center',
          },
        ]}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          // Update the selectionModel only when clicking on the checkbox
          const selectedRowIds = newSelection;
          setSelectedMerchant(
            selectedRowIds.length > 0
              ? merchants.find((merchant) => merchant.id === selectedRowIds[0])
              : null,
          );
        }}
      />

      {/* EDIT ROW SECTION */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: '95vh',
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
              {/* <TextField // this is going to be a picture select field for logo uploading
                label='Logo'
                name='merchantImagePath'
                fullWidth
                defaultValue={editedData.merchantLogo}
                onChange={handleInputChange}
                variant='outlined'
              /> */}
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
                value={editedData.merchantType}
                onChange={handleInputChange}
                variant='outlined'
              />
              {/* <TextField
                label='Status'
                name='status'
                fullWidth
                value={editedData.merchantActive}
                onChange={handleInputChange}
                variant='outlined'
              /> */}
              <Typography variant='h6' sx={{ marginTop: '8px' }}>
                Status
              </Typography>
              <RadioGroup
                name='merchantActive'
                value={editedData.merchantActive}
                onChange={handleInputChange}
                row // Display radio buttons in a horizontal row
                sx={{ marginBottom: '8px' }}
              >
                <FormControlLabel value='Active' control={<Radio />} label='Active' />
                <FormControlLabel value='Inactive' control={<Radio />} label='Inactive' />
              </RadioGroup>
              <TextField
                label='Email'
                name='merchantEmail'
                fullWidth
                value={editedData.merchantEmail}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Designation'
                name='merchantDesignation'
                fullWidth
                value={editedData.merchantDesignation}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Location'
                name='merchantLocation'
                fullWidth
                value={editedData.merchantLocation}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField // this is going to be a color picker field
                label='Colour Theme'
                name='merchantTheme'
                fullWidth
                defaultValue={editedData.merchantColourTheme}
                onChange={handleInputChange}
                variant='outlined'
                sx={{ marginBottom: '8px' }}
              />
              <h4>Logo</h4>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                style={{ marginBottom: '8px' }}
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
