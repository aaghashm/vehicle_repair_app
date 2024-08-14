import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import BikeRepairGuidelines from './BikeRepairGuidelines';
import BookingPage from './BookingPage';
import Footer from './Footer';
import Guide from './Guide';
import HomePage from './HomePage';
import LocalServiceShop from './LocalServiceShop';
import Login from './Login';
import NavBar from './NavBar';
import Safety from './Safety';
import ServiceCalculator from './ServiceCalculator';
import SignUp from './SignUp';
import './styles.css';
import Tips from './Tips';

function App() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userType = user.userType || 'notloggedin';

  return (
    <Router>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={userType === 'admin' ? <Navigate to="/admin" /> : <HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<SignUp />} />
          {userType === 'admin' && <Route path="/admin" element={<AdminPage />} />}
          <Route path="/service-calculator" element={<ServiceCalculator />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/video-assistance" element={<BikeRepairGuidelines />} />
              <Route path="/local-service-shop" element={<LocalServiceShop />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/safety" element={<Safety />} />
          {userType === 'user' && (<Route path="/booking" element={<BookingPage />} />)}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {(userType === 'user' || userType === 'notloggedin') && <Footer />}
    </Router>
  );
}

export default App;
