import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FinishSignupContainer,
  FinishSignupHeader,
  SignupInput,
  FinishSignupButton,
} from './styles';

function FinishSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFinishSignup = () => {
    // Add logic to finish signup
    // For simplicity, let's just navigate back to the home page
    navigate('/multipage');
  };

  return (
    <FinishSignupContainer>
      <FinishSignupHeader>Finish Signup</FinishSignupHeader>
      <SignupInput
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SignupInput
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FinishSignupButton onClick={handleFinishSignup}>Finish Signup</FinishSignupButton>
    </FinishSignupContainer>
  );
}

export default FinishSignup;
