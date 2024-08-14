import React, { useState } from 'react';
import '../Auth/Auth.css';
import { redirect } from "react-router-dom";


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const requestData = {
      name: name,
      email: email,
      password: password,
      about: about
    };

    try {
      const response = await fetch('https://food-recognition-api-imkz.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('User registered successfully!');
        // Reset form fields after successful registration
        setName('');
        setEmail('');
        setPassword('');
        setAbout('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to register. Please try again later.');
    }
  };

  return (

    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div class="input-field">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Enter your name</label>
        </div>

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

        <div class="input-field">
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <label>About</label>
        </div>

        <button type="submit">Register</button>

      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>
        {success}.
        <br></br>
        <a style={{ color: 'red' }} href="/login">Please Login</a>
      </p >
      }

    </div >

  );

}

export default Register;
