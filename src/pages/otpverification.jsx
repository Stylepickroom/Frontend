import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  OtpInput,
  OtpVerificationContainer,
  OtpVerificationHeader,
  OtpVerificationText,
  TimerText,
  VerifyButton,
} from './styles';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setIsResendActive(true);
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyOTP = () => {
    // Add logic to verify OTP
    // For simplicity, let's assume OTP is always 123456
    navigate('/finish');
  };

  const handleResendOTP = () => {
    // Add logic to resend OTP
    // For simplicity, let's reset the timer to 60 seconds
    setTimer(60);
    setIsResendActive(false);
  };

  return (
    <OtpVerificationContainer>
      <OtpVerificationHeader>OTP Verification</OtpVerificationHeader>
      <OtpVerificationText>Enter the OTP sent to your mobile number</OtpVerificationText>
      <OtpInput
        type='text'
        placeholder='OTP'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <VerifyButton onClick={handleVerifyOTP}>Verify</VerifyButton>
      <TimerText>
        Time left: {timer} seconds
        {isResendActive && (
          <span
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              color: isResendActive ? '#007bff' : '#ccc',
              pointerEvents: isResendActive ? 'auto' : 'none',
            }}
            onClick={handleResendOTP}
          >
            Resend OTP
          </span>
        )}
      </TimerText>
    </OtpVerificationContainer>
  );
}

export default OtpVerification;
