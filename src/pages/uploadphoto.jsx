import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { UploadPhotoContainer, UploadPhotoText, PhotoPreview, UploadButton } from './styles';
import HostServer from '../host/host';

const UploadPhoto = () => {
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      const uploadedPhoto = acceptedFiles[0];
      setPhoto(URL.createObjectURL(uploadedPhoto));

      const customerToken = localStorage.getItem('customerToken')
      const formData = new FormData()
      formData.append('file', uploadedPhoto)

      // api calling
      const response = await fetch(`${HostServer}/customer/tryon`, {
        method: 'POST',
        headers: {
          'Authorization': customerToken,
        },
        body: formData
      })

      if (response.ok){
        const data = await response.json();
      }

      // Save photo to local storage
      const reader = new FileReader();
      reader.onload = (event) => {
        localStorage.setItem('uploadedPhoto', event.target.result);
      };
      reader.readAsDataURL(uploadedPhoto);
    },
  });

  const handleNext = () => {
    if (photo) {
      navigate('/displayphoto');
    } else {
      // Add validation or alert the user that they need to upload a photo
    }
  };

  return (
    <UploadPhotoContainer>
      <UploadPhotoText>Upload a photo:</UploadPhotoText>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadButton>Click to Upload</UploadButton>
      </div>
      {photo && <PhotoPreview src={photo} alt='Uploaded Photo' />}
      <UploadButton onClick={handleNext}>Next</UploadButton>
    </UploadPhotoContainer>
  );
};

export default UploadPhoto;
