import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
import Statistics from './Statistics';

const API_URL_USERS = 'http://127.0.0.1:8080/api/users';
const API_URL_VEHICLES = 'http://127.0.0.1:8080/api/vehicles';
const API_URL_SHOPS = 'http://127.0.0.1:8080/api/shops';
const API_URL_ADMINS = 'http://127.0.0.1:8080/api/admins';
const API_URL_BOOKINGS = 'http://127.0.0.1:8080/api/bookings';


function AdminPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Statistics');
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [shops, setShops] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [adminName, setAdminName] = useState('');

  const [userForm, setUserForm] = useState({ userID: '', name: '', email: '', password: '' });
  const [editUserMode, setEditUserMode] = useState(false);

  const [vehicleForm, setVehicleForm] = useState({ id: '', userEmail: '', totalKm: '', vehicleNumber: '', vehicleType: '', yearOfBuying: '' });
  const [editVehicleMode, setEditVehicleMode] = useState(false);

  const [shopForm, setShopForm] = useState({ shopID: '', name: '', address: '', city: '', pincode: '', phone: '' });
  const [editShopMode, setEditShopMode] = useState(false);

  const [adminForm, setAdminForm] = useState({ adminID: '', name: '', email: '', phone: '', password: '' });
  const [editAdminMode, setEditAdminMode] = useState(false);

  const [bookings, setBookings] = useState([]);
const [bookingForm, setBookingForm] = useState({ bookingID: '', brand: '', city: '', completed: false, problemDescription: '', user: { email: '',name: ''  } });
const [editBookingMode, setEditBookingMode] = useState(false);
  
  useEffect(() => {
    fetchUsers();
    fetchVehicles();
    fetchShops();
    fetchAdmins();
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));
    if (loggedInAdmin) {
      setAdminName(loggedInAdmin.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Users
  const fetchUsers = async () => {
    await fetchData(API_URL_USERS, setUsers);
  };

  const handleUserFormChange = (e) => handleFormChange(e, setUserForm);
const fetchBookings = async () => {
  await fetchData(API_URL_BOOKINGS, setBookings);
  console.log(bookings);
};

useEffect(() => {
  fetchBookings();
}, []);

  const handleUserSave = async () => {
    const method = editUserMode ? 'PUT' : 'POST';
    const endpoint = editUserMode ? `${API_URL_USERS}/${userForm.userID}` : API_URL_USERS;
    await handleSave(endpoint, method, userForm, setUsers, users, editUserMode, setEditUserMode, setUserForm, 'userID');
  };

  const handleUserEdit = (user) => {
    setUserForm({ ...user });
    setEditUserMode(true);
    setActiveSection('Users');
  };

  const handleUserDelete = async (userID) => {
    await handleDelete(`${API_URL_USERS}/${userID}`, setUsers, users, userID, 'userID');
  };

  // Vehicles
  const fetchVehicles = async () => {
    await fetchData(API_URL_VEHICLES, setVehicles);
  };

  const handleVehicleFormChange = (e) => handleFormChange(e, setVehicleForm);

  const handleVehicleSave = async () => {
    const method = editVehicleMode ? 'PUT' : 'POST';
    const endpoint = editVehicleMode ? `${API_URL_VEHICLES}/${vehicleForm.id}` : API_URL_VEHICLES;
    await handleSave(endpoint, method, vehicleForm, setVehicles, vehicles, editVehicleMode, setEditVehicleMode, setVehicleForm, 'id');
  };

  const handleVehicleEdit = (vehicle) => {
    setVehicleForm(vehicle);
    setEditVehicleMode(true);
    setActiveSection('Vehicles');
  };
  const handleBookingFormChange = (e) => handleFormChange(e, setBookingForm);

const handleBookingSave = async () => {
  const method = editBookingMode ? 'PUT' : 'POST';
  const endpoint = editBookingMode ? `${API_URL_BOOKINGS}/${bookingForm.bookingID}` : API_URL_BOOKINGS;
  await handleSave(endpoint, method, bookingForm, setBookings, bookings, editBookingMode, setEditBookingMode, setBookingForm, 'bookingID');
};

const handleBookingEdit = (booking) => {
  setBookingForm(booking);
  setEditBookingMode(true);
  setActiveSection('Bookings');
};

const handleBookingDelete = async (bookingID) => {
  await handleDelete(`${API_URL_BOOKINGS}/${bookingID}`, setBookings, bookings, bookingID, 'bookingID');
};


  const handleVehicleDelete = async (id) => {
    await handleDelete(`${API_URL_VEHICLES}/${id}`, setVehicles, vehicles, id, 'id');
  };

  // Shops
  const fetchShops = async () => {
    await fetchData(API_URL_SHOPS, setShops);
  };

  const handleShopFormChange = (e) => handleFormChange(e, setShopForm);

  const handleShopSave = async () => {
    const method = editShopMode ? 'PUT' : 'POST';
    const endpoint = editShopMode ? `${API_URL_SHOPS}/${shopForm.shopID}` : API_URL_SHOPS;
    await handleSave(endpoint, method, shopForm, setShops, shops, editShopMode, setEditShopMode, setShopForm, 'shopID');
  };

  const handleShopEdit = (shop) => {
    setShopForm(shop);
    setEditShopMode(true);
    setActiveSection('Shops');
  };

  const handleShopDelete = async (shopID) => {
    await handleDelete(`${API_URL_SHOPS}/${shopID}`, setShops, shops, shopID, 'shopID');
  };

  // Admins
  const fetchAdmins = async () => {
    await fetchData(API_URL_ADMINS, setAdmins);
  };

  const handleAdminFormChange = (e) => handleFormChange(e, setAdminForm);

  const handleAdminSave = async () => {
    const method = editAdminMode ? 'PUT' : 'POST';
    const endpoint = editAdminMode ? `${API_URL_ADMINS}/${adminForm.adminID}` : API_URL_ADMINS;
    await handleSave(endpoint, method, adminForm, setAdmins, admins, editAdminMode, setEditAdminMode, setAdminForm, 'adminID');
  };

  const handleAdminEdit = (admin) => {
    setAdminForm(admin);
    setEditAdminMode(true);
    setActiveSection('AdminControl');
  };

  const handleAdminDelete = async (adminID) => {
    await handleDelete(`${API_URL_ADMINS}/${adminID}`, setAdmins, admins, adminID, 'adminID');
  };

  // General functions
  const fetchData = async (url, setState) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setState(result);
      } else {
        console.error('Failed to fetch data from', url);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFormChange = (e, setForm) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSave = async (url, method, form, setData, data, editMode, setEditMode, setForm, idField) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (response.ok) {
        if (editMode) {
          setData(data.map(item => item[idField] === form[idField] ? result : item));
          
        } else {
          setData([...data, result]);
        }
        setEditMode(false);
        setForm({});
        alert('Data saved successfully!');
      } else {
        console.error(`Failed to save data: ${result.message}`);
        alert(`Failed to save data: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data: ' + error.message);
    }
  };

  const handleDelete = async (url, setData, data, id, idField) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) {
        setData(data.filter(item => item[idField] !== id));
        alert('Item deleted successfully!');
      } else {
        console.error('Failed to delete');
        alert('Failed to delete item. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item: ' + error.message);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveSection('Statistics')}>Dashboard</li>
            <li onClick={() => setActiveSection('Users')}>Users</li>
            <li onClick={() => setActiveSection('Vehicles')}>Vehicles</li>
            <li onClick={() => setActiveSection('Shops')}>Shops</li>
            <li onClick={() => setActiveSection('AdminControl')}>Admin Control</li>
            <li onClick={() => setActiveSection('Bookings')}>Bookings</li>

          </ul>
        </nav>

        <div className="admin-main">
          {activeSection === 'Statistics' && <Statistics />}
          {activeSection === 'Users' && (
            <div>
              <h2>Manage Users</h2>
              <form onSubmit={handleUserSave}>
                <input type="text" name="name" value={userForm.name} onChange={handleUserFormChange} placeholder="Name" required />
                <input type="email" name="email" value={userForm.email} onChange={handleUserFormChange} placeholder="Email" required />
                <input type="password" name="password" value={userForm.password} onChange={handleUserFormChange} placeholder="Password" required />
                <button type="submit">{editUserMode ? 'Update User' : 'Add User'}</button>
              </form>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.userID}>
                      <td>{user.userID}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => handleUserEdit(user)}>Edit</button>
                        <button onClick={() => handleUserDelete(user.userID)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeSection === 'Vehicles' && (
            <div>
              <h2>Manage Vehicles</h2>
              <form onSubmit={handleVehicleSave}>
                <input type="text" name="userEmail" value={vehicleForm.userEmail} onChange={handleVehicleFormChange} placeholder="User Email" required />
                <input type="text" name="totalKm" value={vehicleForm.totalKm} onChange={handleVehicleFormChange} placeholder="Total Km" required />
                <input type="text" name="vehicleNumber" value={vehicleForm.vehicleNumber} onChange={handleVehicleFormChange} placeholder="Vehicle Number" required />
                <input type="text" name="vehicleType" value={vehicleForm.vehicleType} onChange={handleVehicleFormChange} placeholder="Vehicle Type" required />
                <input type="text" name="yearOfBuying" value={vehicleForm.yearOfBuying} onChange={handleVehicleFormChange} placeholder="Year of Buying" required />
                <button type="submit">{editVehicleMode ? 'Update Vehicle' : 'Add Vehicle'}</button>
              </form>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User Email</th>
                    <th>Total Km</th>
                    <th>Vehicle Number</th>
                    <th>Vehicle Type</th>
                    <th>Year of Buying</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(vehicle => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.userEmail}</td>
                      <td>{vehicle.totalKm}</td>
                      <td>{vehicle.vehicleNumber}</td>
                      <td>{vehicle.vehicleType}</td>
                      <td>{vehicle.yearOfBuying}</td>
                      <td>
                        <button onClick={() => handleVehicleEdit(vehicle)}>Edit</button>
                        <button onClick={() => handleVehicleDelete(vehicle.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeSection === 'Shops' && (
            <div>
              <h2>Manage Shops</h2>
              <form onSubmit={handleShopSave}>
                <input type="text" name="name" value={shopForm.name} onChange={handleShopFormChange} placeholder="Shop Name" required />
                <input type="text" name="address" value={shopForm.address} onChange={handleShopFormChange} placeholder="Address" required />
                <input type="text" name="city" value={shopForm.city} onChange={handleShopFormChange} placeholder="City" required />
                <input type="text" name="pincode" value={shopForm.pincode} onChange={handleShopFormChange} placeholder="Pincode" required />
                <input type="text" name="phone" value={shopForm.phone} onChange={handleShopFormChange} placeholder="Phone" required />
                <button type="submit">{editShopMode ? 'Update Shop' : 'Add Shop'}</button>
              </form>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Pincode</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shops.map(shop => (
                    <tr key={shop.shopID}>
                      <td>{shop.shopID}</td>
                      <td>{shop.name}</td>
                      <td>{shop.address}</td>
                      <td>{shop.city}</td>
                      <td>{shop.pincode}</td>
                      <td>{shop.phone}</td>
                      <td>
                        <button onClick={() => handleShopEdit(shop)}>Edit</button>
                        <button onClick={() => handleShopDelete(shop.shopID)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeSection === 'AdminControl' && (
            <div>
              <h2>Manage Admins</h2>
              <form onSubmit={handleAdminSave}>
                <input type="text" name="name" value={adminForm.name} onChange={handleAdminFormChange} placeholder="Admin Name" required />
                <input type="email" name="email" value={adminForm.email} onChange={handleAdminFormChange} placeholder="Email" required />
                <input type="text" name="phone" value={adminForm.phone} onChange={handleAdminFormChange} placeholder="Phone" required />
                <input type="password" name="password" value={adminForm.password} onChange={handleAdminFormChange} placeholder="Password" required />
                <button type="submit">{editAdminMode ? 'Update Admin' : 'Add Admin'}</button>
              </form>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map(admin => (
                    <tr key={admin.adminID}>
                      <td>{admin.adminID}</td>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.phone}</td>
                      <td>
                        <button onClick={() => handleAdminEdit(admin)}>Edit</button>
                        <button onClick={() => handleAdminDelete(admin.adminID)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeSection === 'Bookings' && (
  <div>
    <h2>Manage Bookings</h2>
    <form onSubmit={handleBookingSave}>
  <input type="text" name="brand" value={bookingForm.brand} onChange={handleBookingFormChange} placeholder="Brand" required />
  <input type="text" name="city" value={bookingForm.city} onChange={handleBookingFormChange} placeholder="City" required />
  <textarea name="problemDescription" value={bookingForm.problemDescription} onChange={handleBookingFormChange} placeholder="Problem Description" required />
  <input type="checkbox" name="completed" checked={bookingForm.completed} onChange={(e) => handleBookingFormChange({ target: { name: 'completed', value: e.target.checked } })} /> Completed
  <input type="text" name="user.email" value={bookingForm.user.email} onChange={handleBookingFormChange} placeholder="User Email" required />
  <input type="text" name="user.name" value={bookingForm.user.name} onChange={handleBookingFormChange} placeholder="User Name" required /> {/* User Name */}
  <button type="submit">{editBookingMode ? 'Update Booking' : 'Add Booking'}</button>
</form>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Brand</th>
      <th>City</th>
      <th>Problem Description</th>
      <th>Completed</th>
      <th>User Email</th>
      <th>User Name</th> {/* New column for User Name */}
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {bookings.map(booking => (
      <tr key={booking.bookingID}>
        <td>{booking.bookingID}</td>
        <td>{booking.brand}</td>
        <td>{booking.city}</td>
        <td>{booking.problemDescription}</td>
        <td>{booking.completed ? 'Yes' : 'No'}</td>
        <td>{booking.user.email}</td>
        <td>{booking.user.name}</td> {/* Display User Name */}
        <td>
          <button onClick={() => handleBookingEdit(booking)}>Edit</button>
          <button onClick={() => handleBookingDelete(booking.bookingID)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  </div>
)}

        </div>
      </div>
    </div>
  );
}

export default AdminPage;
