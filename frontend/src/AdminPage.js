import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
import Statistics from './Statistics';

const API_URL_USERS = 'http://127.0.0.1:8080/api/users';
const API_URL_VEHICLES = 'http://127.0.0.1:8080/api/vehicles';
const API_URL_SHOPS = 'http://127.0.0.1:8080/api/shops';
const API_URL_ADMINS = 'http://127.0.0.1:8080/api/admins';

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
      } else {
        console.error(`Failed to save data: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (url, setData, data, id, idField) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) {
        setData(data.filter(item => item[idField] !== id));
      } else {
        console.error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="admin-container">
      <header className="top-navbar">
        <h1>Admin Dashboard</h1>
        <div className="admin-info">
          <span>{adminName}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="admin-content">
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveSection('Statistics')}>Dashboard</li>
            <li onClick={() => setActiveSection('Users')}>Users</li>
            <li onClick={() => setActiveSection('Vehicles')}>Vehicles</li>
            <li onClick={() => setActiveSection('Shops')}>Shops</li>
            <li onClick={() => setActiveSection('AdminControl')}>Admin Control</li>
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
              <ul>
                {users.map(user => (
                  <li key={user.userID}>
                    {user.name} ({user.email})
                    <button onClick={() => handleUserEdit(user)}>Edit</button>
                    <button onClick={() => handleUserDelete(user.userID)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeSection === 'Vehicles' && (
            <div>
              <h2>Manage Vehicles</h2>
              <form onSubmit={handleVehicleSave}>
                <input type="text" name="vehicleNumber" value={vehicleForm.vehicleNumber} onChange={handleVehicleFormChange} placeholder="Vehicle Number" required />
                <input type="text" name="vehicleType" value={vehicleForm.vehicleType} onChange={handleVehicleFormChange} placeholder="Vehicle Type" required />
                <input type="number" name="yearOfBuying" value={vehicleForm.yearOfBuying} onChange={handleVehicleFormChange} placeholder="Year of Buying" required />
                <input type="number" name="totalKm" value={vehicleForm.totalKm} onChange={handleVehicleFormChange} placeholder="Total Km" required />
                <input type="email" name="userEmail" value={vehicleForm.userEmail} onChange={handleVehicleFormChange} placeholder="User Email" required />
                <button type="submit">{editVehicleMode ? 'Update Vehicle' : 'Add Vehicle'}</button>
              </form>
              <ul>
                {vehicles.map(vehicle => (
                  <li key={vehicle.id}>
                    {vehicle.vehicleNumber} ({vehicle.vehicleType})
                    <button onClick={() => handleVehicleEdit(vehicle)}>Edit</button>
                    <button onClick={() => handleVehicleDelete(vehicle.id)}>Delete</button>
                  </li>
                ))}
              </ul>
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
              <ul>
                {shops.map(shop => (
                  <li key={shop.shopID}>
                    {shop.name} ({shop.city})
                    <button onClick={() => handleShopEdit(shop)}>Edit</button>
                    <button onClick={() => handleShopDelete(shop.shopID)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeSection === 'AdminControl' && (
            <div>
              <h2>Manage Admins</h2>
              <form onSubmit={handleAdminSave}>
                <input type="text" name="name" value={adminForm.name} onChange={handleAdminFormChange} placeholder="Admin Name" required />
                <input type="email" name="email" value={adminForm.email} onChange={handleAdminFormChange} placeholder="Email" required />
                <input type="password" name="password" value={adminForm.password} onChange={handleAdminFormChange} placeholder="Password" required />
                <input type="text" name="phone" value={adminForm.phone} onChange={handleAdminFormChange} placeholder="Phone" required />
                <button type="submit">{editAdminMode ? 'Update Admin' : 'Add Admin'}</button>
              </form>
              <ul>
                {admins.map(admin => (
                  <li key={admin.adminID}>
                    {admin.name} ({admin.email})
                    <button onClick={() => handleAdminEdit(admin)}>Edit</button>
                    <button onClick={() => handleAdminDelete(admin.adminID)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
