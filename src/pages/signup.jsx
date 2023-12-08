// Signup.js
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { SignupContainer, SignupHeader, SignupInput } from './styles';

function Signup() {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [associatedMerchantID, setAssociatedMerchantID] = useState('');
  const [merchantAssociatedApparelID, setMerchantAssociatedApparelID] = useState('');
  useEffect(() => {
    const merchantID = new URLSearchParams(window.location.search).get('merchanID');
    const apparelID = new URLSearchParams(window.location.search).get('apparelID');

    setAssociatedMerchantID(merchantID);
    setMerchantAssociatedApparelID(apparelID);
    if (associatedMerchantID && merchantAssociatedApparelID) {
      localStorage.setItem('associatedMerchantID', associatedMerchantID);
      localStorage.setItem('merchantAssociatedApparelID', merchantAssociatedApparelID);
    }
  }, [location.search]);

  localStorage.setItem('phoneNumber', mobileNumber);

  const handleGetOTP = async () => {
    // Add logic to get OTP
    try {
      const response = await fetch(
        `https://node-backend.up.railway.app/customer/login?merchanID=${associatedMerchantID}&apparelID=${merchantAssociatedApparelID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: mobileNumber,
          }),
        },
      );

      if (response.ok) {
        navigate('/otp');
      } else {
        console.log(`Failed to send otp, error: ${response.statusText}`);
      }
    } catch (err) {
      console.log(err.message);
    }
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
          width: '80%',
          textDecoration: 'none',
          color: '#fff',
          background: '#853836',
          padding: '10px 20px',
          borderRadius: '5px',
          display: 'inline-block',
          fontSize: '16px',
        }}
      >
        Get OTP
      </button>
    </SignupContainer>
  );
}

export default Signup;
