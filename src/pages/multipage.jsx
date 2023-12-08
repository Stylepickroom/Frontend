import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BottomText,
  EmbeddedPhoto,
  MultipageText,
  NextButton,
  PaginationBox,
  PaginationContainer,
  ThreePartMultipageContainer,
} from './styles';

const ThreePartMultipage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (page < 3) {
      setPage(page + 1);
    } else {
      // Navigate to the next route when on the last part
      navigate('/uploadphoto');
    }
  };
  const handlePageClick = (num) => {
    setPage(num);
  };

  return (
    <ThreePartMultipageContainer>
      <PaginationContainer>
        {[1, 2, 3].map((num) => (
          <PaginationBox key={num} active={num === page} onClick={() => handlePageClick(num)} />
        ))}
      </PaginationContainer>
      {page === 1 && (
        <>
          <MultipageText style={{ fontSize: '24px' }}>Welcome to Virtual Room</MultipageText>
          <EmbeddedPhoto
            src='https://res.cloudinary.com/dhnkuonev/image/upload/v1701927607/uqnsjhip5qkq3wkfvxw8.png'
            alt='Embedded Photo 1'
          />
        </>
      )}
      {page === 2 && (
        <>
          <MultipageText>Do not upload selfie or group photo</MultipageText>
          <EmbeddedPhoto
            src='https://res.cloudinary.com/dhnkuonev/image/upload/v1701927606/ffkw492v99yscse1c5g7.png'
            alt='Embedded Photo 2'
          />
        </>
      )}
      {page === 3 && (
        <>
          <MultipageText>Upload a full-body image</MultipageText>
          <EmbeddedPhoto
            src='https://res.cloudinary.com/dhnkuonev/image/upload/v1701927592/lwtrlpaadcuhzyzuaay8.png'
            alt='Embedded Photo 3'
          />
        </>
      )}
      <NextButton onClick={handleNext}>{page < 3 ? 'Next' : 'Finish'}</NextButton>
      <BottomText>We keep your personal information private, safe and secure.</BottomText>
    </ThreePartMultipageContainer>
  );
};

export default ThreePartMultipage;
