import axios from 'axios'; // Import axios for making HTTP requests
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cs1 from './images/cs1.jpg';
import './styles.css'; // Import CSS file for styling

function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userEmail = storedUser?.email;
  const userType = storedUser?.userType || 'notloggedin';

  useEffect(() => {
    if (userEmail) {
      // Determine the endpoint based on userType
      const endpoint = userType === 'admin'
        ? `http://localhost:8080/api/admins/email/${userEmail}` // Separate endpoint for admins
        : `http://localhost:8080/api/users/email/${userEmail}`; // Endpoint for regular users

      axios.get(endpoint)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          // Clear user data if error occurs
          localStorage.removeItem('user');
          navigate('/login');
        });
    } else {
      // If no userEmail, ensure to clear user state and navigate to login
      setUser(null);
    }
  }, [userEmail, userType, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Clear user state on logout
    window.alert("logged out Sucessfully");
    navigate('/login');
};


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/'><img src={cs1} alt="Company Logo" className="navbar-logo" /></a> {/* Update with your logo path */}
        <input type="text" className="navbar-search" placeholder="Search..." />
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          {!user ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          ) : userType === 'admin' ? (
            <>
              <li><Link to="/admin">Admin Page</Link></li>
              <li><Link to="/">Home</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
            </>
          )}
          {user && (
            <>
             <li>
      <Link to="/profile">{user.name} ({userType})</Link> {/* Link to profile */}
    </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
