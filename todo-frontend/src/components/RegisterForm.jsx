import { useState } from 'react';

export default function RegisterForm({ setRegistered }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg === 'User created successfully') {
          alert('Registration successful! You can now log in.');
          setRegistered(true); // Switch to login form
        } else {
          alert(data.msg);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleRegister} style={{ marginBottom: '1rem' }}>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}
