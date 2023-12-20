import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../BillingCard/BillingCard.css';
import { useState } from 'react';

const BillingCard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [billingPlan, setBillingPlan] =useState(null);
  const [email, setEmail] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePlanChange = (event) => {
    setBillingPlan(event.target.value);
  };

  const handleSaveButtonClick = async () => {
    const dateValue = selectedDate;
    const formattedDate = dateValue.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      console.log('Authorization failed, token not found');
      return;
    }

    const response = await fetch('https://node-backend.up.railway.app/admin/merchant/plan-create', {
      method: 'POST',
      headers: {
        Authorization: adminToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: billingPlan,
        date: formattedDate,
        email: email
      })
    });
  };

  return (
    <div className='outer-div bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto my-16 '>
      <div className='header'>
        <h3 className='h3-tag text-3xl font-bold text-gray-700 mb-2'>Billing Details</h3>
        <button className='edit-btn px-4 py-2 bg-blue-700 text-white rounded-md'>Edit</button>
      </div>
      <div className='billing-plan'>
        <FormControl>
          <FormLabel
            sx={{ fontWeight: 'bold', color: 'black' }}
            id='demo-radio-buttons-group-label'
          >
            Billing Plan
          </FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
            onChange={handlePlanChange}
          >
            <FormControlLabel value='Quarterly' control={<Radio />} label='Quarterly' />
            <FormControlLabel value='Monthly' control={<Radio />} label='Monthly' />
            <FormControlLabel value='Yearly' control={<Radio />} label='Yearly' />
          </RadioGroup>
        </FormControl>
        {/* React-datepicker usage */}
        <DatePicker
          className='custom-datepicker'
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat='yyyy-MM-dd'
          placeholderText='Select Date'
        />

        <TextField 
        sx={{}} 
        id='outlined-basic' 
        label='Email' 
        variant='outlined'
        onChange={handleEmailChange}
        />
        <Button sx={{ width: '25px' }} variant='contained' onClick={handleSaveButtonClick}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default BillingCard;
