// Signup.js
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { InputWrapper, Prefix, SignupContainer, SignupHeader, SignupInput } from './styles';
import HostServer from '../host/host';

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

  localStorage.setItem('phoneNumber', `+91${mobileNumber}`);

  const handleGetOTP = async () => {
    // Add logic to get OTP
    try {
      const response = await fetch(
        `${HostServer}/customer/login?merchanID=${associatedMerchantID}&apparelID=${merchantAssociatedApparelID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: localStorage.getItem('phoneNumber'),
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
      <InputWrapper>
        <Prefix>+91</Prefix>
        <SignupInput
          type='text'
          placeholder='Mobile Number'
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </InputWrapper>
      <button
        onClick={handleGetOTP}
        style={{
          width: '80%',
          textDecoration: 'none',
          color: '#fff',
          background: 'var(--primary-color)',
          padding: '10px 20px',
        }}
      >
        Get OTP
      </button>
    </SignupContainer>
  );
}

export default Signup;
