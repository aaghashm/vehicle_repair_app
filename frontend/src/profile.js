import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { FiUser } from 'react-icons/fi'; // User profile icon

function Profile() {
  const [userData, setUserData] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({
    userEmail: '',
    totalKm: '',
    vehicleNumber: '',
    vehicleType: '',
    yearOfBuying: '',
  });
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);  // Toggle form visibility
  const navigate = useNavigate();
  
  // User Information
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userEmail = storedUser?.email;
  const userType = storedUser?.userType || 'notloggedin';

  // Fetch User Data
  useEffect(() => {
    if (userEmail) {
      const endpoint = userType === 'admin'
        ? `http://localhost:8080/api/admins/email/${userEmail}`
        : `http://localhost:8080/api/users/email/${userEmail}`;
      axios.get(endpoint)
        .then(response => setUserData(response.data))
        .catch(error => {
          console.error('Error fetching profile details:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [userEmail, userType, navigate]);

  // Fetch Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`http://localhost:8080/api/bookings/user?email=${userEmail}`);
      const data = await response.json();
      setBookings(data);
    };
    if (userEmail) fetchBookings();
  }, [userEmail]);

  // Fetch Vehicles associated with the User Email
  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch(`http://localhost:8080/api/vehicles`);
      const data = await response.json();
      setVehicles(data.filter(vehicle => vehicle.userEmail === userEmail)); // Filter by user email
    };
    if (userEmail) fetchVehicles();
  }, [userEmail]);

  // Handle Vehicle Form Input
  const handleVehicleFormChange = (e) => {
    setVehicleForm({ ...vehicleForm, [e.target.name]: e.target.value });
  };

  // Submit Vehicle Form
  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:8080/api/vehicles`, vehicleForm);
    setVehicles([...vehicles, response.data]); // Update vehicles
    setVehicleForm({ userEmail: '', totalKm: '', vehicleNumber: '', vehicleType: '', yearOfBuying: '' });
    setIsFormVisible(false); // Hide the form after submission
  };

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <header className="profile-header">
          <FiUser size={60} color="#4CAF50" />
          <h2>User Profile</h2>
        </header>

        {userData ? (
          <div className="profile-details">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>User Type:</strong> {userType}</p>
            {userType === 'admin' && <p><strong>Phone:</strong> {userData.phone}</p>}
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
    {userType === 'user' && (
  <section className="vehicle-section">
    <h3>Your Vehicles</h3>
    
    {/* Toggle Button */}
    <button className="expand-button" onClick={toggleForm}>
      {isFormVisible ? 'Hide Vehicle Form' : 'Add New Vehicle'}
    </button>
    
    {/* Add Vehicle Form */}
    {isFormVisible && (
      <form onSubmit={handleVehicleSubmit} className="vehicle-form">
        <input type="text" name="userEmail" value={vehicleForm.userEmail} onChange={handleVehicleFormChange} placeholder="User Email" required />
        <input type="text" name="totalKm" value={vehicleForm.totalKm} onChange={handleVehicleFormChange} placeholder="Total Km" required />
        <input type="text" name="vehicleNumber" value={vehicleForm.vehicleNumber} onChange={handleVehicleFormChange} placeholder="Vehicle Number" required />
        <input type="text" name="vehicleType" value={vehicleForm.vehicleType} onChange={handleVehicleFormChange} placeholder="Vehicle Type" required />
        <input type="text" name="yearOfBuying" value={vehicleForm.yearOfBuying} onChange={handleVehicleFormChange} placeholder="Year of Buying" required />
        <button type="submit">Add Vehicle</button>
      </form>
    )}

    <div className="vehicle-list">
      {vehicles.length === 0 ? <p>No vehicles found.</p> : vehicles.map(vehicle => (
        <div key={vehicle.id} className="vehicle-item">
          <p><strong>Number:</strong> {vehicle.vehicleNumber}</p>
          <p><strong>Type:</strong> {vehicle.vehicleType}</p>
          <p><strong>Total Km:</strong> {vehicle.totalKm}</p>
          <p><strong>Year of Buying:</strong> {vehicle.yearOfBuying}</p>
        </div>
      ))}
    </div>
  </section>
)}

{/* Bookings Section */}
{userType === 'user' && (
  <section className="bookings-section">
    <h3>Your Bookings</h3>
    <div className="booking-list">
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : bookings.map(booking => (
        <div key={booking.bookingID} className="booking-item">
          <p><strong>Vehicle:</strong> {booking.vehicleType} ({booking.brand})</p>
          <p><strong>Problem:</strong> {booking.problemDescription}</p>
          <p><strong>City:</strong> {booking.city}</p>
          <p><strong>Status:</strong> {booking.completed ? 'Completed' : 'Pending'}</p>
        </div>
      ))}
    </div>
  </section>
)}

      </div>
    </div>
  );
}

export default Profile;
