import React, { useState } from 'react';
import './Auth.css';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const requestData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('https://food-recognition-api-imkz.onrender.com/logintoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('User logged in successfully!');
        localStorage.setItem('accessToken', result.access_token);
        localStorage.setItem('isAuthenticated', 'true');

        setEmail('');
        setPassword('');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to login. Please try again later.');
    }
  };


  return (

    <div className='wrapper'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <div class="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Enter your email</label>
        </div>

        <div class="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Enter your password</label>
        </div>

        <button type="submit">Login</button>

      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default Login;
