import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import BikeRepairGuidelines from './BikeRepairGuidelines';
import Footer from './Footer';
import Guide from './Guide';
import HomePage from './HomePage';
import LocalServiceShop from './LocalServiceShop';
import Login from './Login';
import NavBar from './NavBar';
import Safety from './Safety';
import ServiceCalculator from './ServiceCalculator';
import SignUp from './SignUp';
import Tips from './Tips';
import './styles.css';

function App() {
  // Get user from localStorage, default to an empty object if not found
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  // Determine userType based on user data, default to 'notloggedin' if userType is not defined
  const userType = user.userType || 'notloggedin'; // Changed to `user.userType`

  // Log the userType for debugging
  console.log('User Type in App:', userType);

  return (
    <Router>
      {(userType === 'user' || userType === 'notloggedin') && <NavBar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={userType === 'admin' ? <Navigate to="/admin" /> : <HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<SignUp />} />
          {userType === 'admin' && <Route path="/admin" element={<AdminPage />} />}
          {userType === 'user' && (
            <>
              <Route path="/service-calculator" element={<ServiceCalculator />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/video-assistance" element={<BikeRepairGuidelines />} />
              <Route path="/local-service-shop" element={<LocalServiceShop />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/safety" element={<Safety />} />
            </>
          )}
        </Routes>
      </main>
      {(userType === 'user' || userType === 'notloggedin') && <Footer />}
    </Router>
  );
}

export default App;
