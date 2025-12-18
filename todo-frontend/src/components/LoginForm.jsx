import { useState } from 'react';

export default function LoginForm({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg === 'Logged in successfully') setLoggedIn(true);
        else alert(data.msg);
      });
  };

  return (
    <form onSubmit={handleLogin} style={{ marginBottom: '1rem' }}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
