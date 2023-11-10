// Signup.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { SignupContainer, SignupHeader, SignupInput } from './styles';

function Signup() {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleGetOTP = () => {
    // Add logic to get OTP
    // For simplicity, let's assume OTP is always 123456
    navigate('/otp');
  };

  return (
    <SignupContainer>
      <SignupHeader>Lets Signup</SignupHeader>
      <SignupInput
        type='text'
        placeholder='Mobile Number'
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button
        onClick={handleGetOTP}
        style={{
          textDecoration: 'none',
          color: '#fff',
          background: '#007bff',
          padding: '10px 20px',
          borderRadius: '5px',
          display: 'inline-block',
          fontize: '16px',
        }}
      >
        Get OTP
      </button>
    </SignupContainer>
  );
}

export default Signup;
