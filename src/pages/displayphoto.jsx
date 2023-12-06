import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoBagHandleOutline } from 'react-icons/io5';
import { MdAddCircleOutline } from 'react-icons/md';

const FullScreenContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const StyledContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const StyledImage = styled.img`
  height: 450px;
  object-fit: fill;
  aspect-ratio: 9/16;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 5px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DisplayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const Box = styled.div`
  width: 45%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0e1e0;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
`;

const MiniatureImage = styled.img`
  height: 150px;
  width: 120px;
  padding: 2% 4%;
  border-radius: 10px;
  margin: 5px;
`;

const MiniatureText = styled.h5`
  font-weight: 500;
  margin-top: 10px;
`;

const PhotoCarousel = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  margin-top: 10px;
`;

const DisplayPhoto = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState(
    JSON.parse(localStorage.getItem('uploadedPhotos')) || { photo: [], dress: [] },
  );

  useEffect(() => {
    const photoData = localStorage.getItem('uploadedPhoto');
    if (photoData) {
      setUploadedPhotos((prevState) => ({
        ...prevState,
        photo: prevState.photo.length > 0 ? [...prevState.photo] : [photoData],
      }));
    }
  }, []);

  const handleAddPhoto = (event, section) => {
    const files = event.target.files;
    const newPhotos = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = function (e) {
        newPhotos.push(e.target.result);
        if (i === files.length - 1) {
          setUploadedPhotos({
            ...uploadedPhotos,
            [section]: [...uploadedPhotos[section], ...newPhotos],
          });
          localStorage.setItem(
            'uploadedPhotos',
            JSON.stringify({
              ...uploadedPhotos,
              [section]: [...uploadedPhotos[section], ...newPhotos],
            }),
          );
        }
      };

      reader.readAsDataURL(files[i]);
    }
  };

  return (
    <FullScreenContainer>
      <StyledContainer>
        <ButtonContainer>
          <BackLink to='/uploadphoto'>
            <IoMdCloseCircleOutline size={30} color='grey' />
          </BackLink>
          <BackLink>
            <IoBagHandleOutline size={30} color=' #853836' />
          </BackLink>
        </ButtonContainer>
        <StyledImage src={uploadedPhotos.photo[0] || ''} alt='Uploaded Photo' />
      </StyledContainer>
      <DisplayContainer>
        <Box>
          <MiniatureText>Your Photo</MiniatureText>
          <PhotoCarousel>
            {uploadedPhotos.photo.map((photo, index) => (
              <MiniatureImage key={index} src={photo} alt={`photo-${index}`} />
            ))}
          </PhotoCarousel>
          <label htmlFor='file-input-photo'>
            <MdAddCircleOutline size={20} />
          </label>
          <input
            id='file-input-photo'
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={(e) => handleAddPhoto(e, 'photo')}
            multiple
          />
        </Box>
        <Box>
          <MiniatureText>Your Dress</MiniatureText>
          <PhotoCarousel>
            {uploadedPhotos.photo.map((photo, index) => (
              <MiniatureImage key={index} src={photo} alt={`photo-${index}`} />
            ))}
          </PhotoCarousel>
          <label htmlFor='file-input-photo'>
            <MdAddCircleOutline size={20} />
          </label>
          <input
            id='file-input-photo'
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={(e) => handleAddPhoto(e, 'photo')}
            multiple
          />
        </Box>
      </DisplayContainer>
    </FullScreenContainer>
  );
};

export default DisplayPhoto;
