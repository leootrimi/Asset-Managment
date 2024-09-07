import React, { useState } from 'react';
import { ReactComponent as LoginIcon } from '../../assets/signin.svg';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        alert('Login Successful');
        onLogin();  
        navigate('/admin/dashboard'); 
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
          <LoginIcon className="login-icon-img" />
        </div>
        <h1 className="login-heading">Welcome!</h1>
        <p className="login-message">Sign in to your account</p>

        {error && <p className="error-message">{error}</p>} {/* Show error if login fails */}

        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
