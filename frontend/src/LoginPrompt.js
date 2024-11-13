import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.text}>Please Login to Use this Feature</h2>
      <div style={styles.buttonContainer}>
        <button 
          onClick={handleLogin} 
          style={styles.button} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Login →
        </button>
        <button 
          onClick={handleGoBack} 
          style={styles.button}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start', // Aligning content towards the top
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#E0E0E0',
    fontFamily: 'Roboto, Arial, sans-serif',
    padding: '20px',
    paddingTop: '10vh', // Adds top padding for vertical alignment
  },
  text: {
    marginBottom: '24px',
    fontSize: '2rem', // Increased font size for better readability
    fontWeight: '500',
    textAlign: 'center',
    color: '#E0E0E0',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '14px 28px',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#121212',
    backgroundColor: '#BB86FC',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Added transform transition
    boxShadow: '0 6px 14px rgba(0, 0, 0, 0.25)', // Softer shadow for button depth
  },
  buttonHover: {
    backgroundColor: '#9E67DB', // Darker hover color for contrast
    transform: 'scale(1.05)', // Slight scale effect on hover
  },
};

export default LoginPrompt;
