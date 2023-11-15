import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically make a request to your backend
    // For example: axios.post('/api/login', { email, password })
    console.log('Login Submitted', email, password);
  };

  const initiateOAuth = (service) => {
    // Redirect to your backend endpoint which handles OAuth
    window.location.href = `http://localhost:3001/auth/${service}`;
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={() => initiateOAuth('Twitter')}>Log in with Twitter</button>
        <button onClick={() => initiateOAuth('Facebook')}>Log in with Facebook</button>
        <button onClick={() => initiateOAuth('Instagram')}>Log in with Instagram</button>
      </div>
      <div>
        {/* Links to Facebook's privacy policy, data deletion, and terms of service */}
        <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">
          Facebook Privacy Policy
        </a>
        <a href="https://www.facebook.com/help/186570224871049" target="_blank" rel="noopener noreferrer">
          Data Deletion on Facebook
        </a>
        <a href="https://www.facebook.com/terms.php" target="_blank" rel="noopener noreferrer">
          Facebook Terms of Service
        </a>
      </div>
    </div>
  );
}

export default Login;
