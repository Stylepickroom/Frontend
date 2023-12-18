/* eslint-disable no-undef */
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CustomList from './CustomList';
import OverviewCard from '../Overview/Card';
import ApparelTable from '../Table/MerchantTable';
import BillingCard from '../BillingCard/BillingCard';
// import CustomerTable from '../Table/CustomerTable';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function AdminPanelSidenav() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState('Overview'); // Initialize the selected section
  const [isAddMerchantDialogOpen, setAddMerchantDialogOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [apparelList, setApparelList] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Function to handle section clicks and update the selected section
  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderDataTable = () => {};
  const handleAddMerchant = () => {
    setAddMerchantDialogOpen(true);
  };

  const handleCloseAddMerchantDialog = () => {
    setAddMerchantDialogOpen(false);
  };
  const handleAddMerchantAction = async () => {
    // Add your logic for handling the add merchant action here
    // can perform form validation and submit the data

    try {
      const merchantToken = localStorage.getItem('merchantToken');
      if (!merchantToken) {
        console.log('Authorization failed, token not found');
        return;
      }
      const formData = {
        apparelID: document.getElementById('apparelId').value,
        apparelName: document.getElementById('apparelName').value,
        apparelType: document.getElementById('apparelType').value,
        imageUrl: document.getElementById('imageUrl').value,
      };
      const response = await fetch('https://node-backend.up.railway.app/merchant/apparel/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: merchantToken,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setApparelList((apparelList) => [...apparelList, result.apparel]);
        console.log(result);
        await fetchApparelList();
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err.message);
    }
    handleCloseAddMerchantDialog(); // Close the dialog after handling the action
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Merchant Details','Billing Details'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleSectionClick(text)} // Handle section click
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text === 'Merchant Details' ? (
                    <InboxIcon />
                  ) : text === 'Billing Details' ? (
                    <InboxIcon />
                  ) : null }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <CustomList title='Reports' items={['Merchant Details']} open={open} />
        {renderDataTable()}
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {selectedSection === 'Merchant Details' && (
          <Button variant='contained' color='primary' onClick={handleAddMerchant} sx={{ mb: 2 }}>
            Add Merchant
          </Button>
        )}
        {selectedSection === 'Merchant Overview' && <OverviewCard />}
        {selectedSection === 'Merchant Details' && <ApparelTable />}
        {selectedSection === 'Billing Details' && <BillingCard />}
        {/* {selectedSection === 'Customer Details' && <CustomerTable />} */}
      </Box>
      <Dialog open={isAddMerchantDialogOpen} onClose={handleCloseAddMerchantDialog}>
        <DialogTitle>Add Merchant</DialogTitle>
        <DialogContent>
          {/* Add your form or content for adding a merchant here */}
          {/* For example, you can add a form with input fields */}
          <Typography variant='body1'>Merchant Information:</Typography>

          <TextField
            autoFocus
            margin='dense'
            id='merchantId'
            label='Merchant ID'
            type='text'
            fullWidth
          />
          <TextField margin='dense' id='merchantName' label='Merchant Name' type='text' fullWidth />
          <TextField margin='dense' id='merchantType' label='Merchant Type' type='text' fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddMerchantDialog}>Cancel</Button>
          {/* Add your logic for handling the add merchant action here */}
          <Button onClick={handleAddMerchantAction} color='primary'>
            Add Merchant
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
