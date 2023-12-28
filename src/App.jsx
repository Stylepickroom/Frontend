import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './Components/SignInPage/SignInPage';
import LayoutPage from './Components/Layout/LayoutPage';
import HomePage from './pages/homepage';
import Signup from './pages/signup';
import OtpVerification from  './pages/otpverification';
import FinishSignup from './pages/finishsignup';
import ThreePartMultipage from './pages/multipage';
import UploadPhoto from './pages/uploadphoto';
import DisplayPhoto from './pages/displayphoto';

// admin section
import AdminSignInPage from './AdminPanel/SignInPage/SignInPage';
import AdminPanelSidenav from './AdminPanel/Sidenav/AdminPanelSidenav';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const primaryColorFromBackend = localStorage.getItem('themeColor') || '#853836';
    document.documentElement.style.setProperty('--primary-color', primaryColorFromBackend);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path='/merchant/signin' element={<SignInPage />} />
          <Route path='/merchant/dashboard' element={<LayoutPage />} />


          <Route path='/home' element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<OtpVerification />} />
          <Route path='/finish' element={<FinishSignup />} />
          <Route path='/multipage' element={<ThreePartMultipage />} />
          <Route path='/uploadphoto' element={<UploadPhoto />} />
          <Route path='/displayphoto' element={<DisplayPhoto />} />


          <Route path='/admin/signin' element={<AdminSignInPage />} />
          <Route path='/admin/dashboard' element={<AdminPanelSidenav />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
