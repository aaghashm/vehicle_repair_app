import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const baseURL = 'http://localhost:8080'; // Replace with your backend's address and port
    const endpoint = isAdmin ? `${baseURL}/api/auth/login/admin` : `${baseURL}/api/auth/login/user`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Log the full response for debugging
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      if (response.ok) {
        const data = await response.json();
        const { token, userType, email: userEmail } = data.user; // Access data.user

        // Log the userType for debugging
        console.log('User Type:', userType);

        // Store the token, userType, and email in localStorage
        localStorage.setItem('user', JSON.stringify({ token, email: userEmail, userType }));

        // Redirect based on user type
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        alert(`Login Failed: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Login Failed: Unable to connect to the server.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Login as Admin
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
