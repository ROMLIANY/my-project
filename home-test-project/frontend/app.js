import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      setToken(res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default App;
