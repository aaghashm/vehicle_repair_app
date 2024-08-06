import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('user', JSON.stringify({ token }));
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Login Failed: ${errorData.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login Failed!');
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
