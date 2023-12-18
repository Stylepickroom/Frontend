import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './Components/SignInPage/SignInPage';
import LayoutPage from './Components/Layout/LayoutPage';

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
          <Route path='/' element={<SignInPage />} />
          <Route path='/merchant' element={<LayoutPage />} />
          <Route path='/customer' element={<LayoutPage />} />
          <Route path='/admin/signin' element={<AdminSignInPage />} />
          <Route path='/admin/dashboard' element={<AdminPanelSidenav />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
