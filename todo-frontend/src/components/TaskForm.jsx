import { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask({ title, priority, due_date: dueDate });
    setTitle('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        marginBottom: '1rem', 
        display: 'flex', 
        gap: '0.5rem', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ flex: '2 1 200px', padding: '0.3rem' }}
      />
      <select 
        value={priority} 
        onChange={e => setPriority(e.target.value)}
        style={{ flex: '1 1 100px', padding: '0.3rem' }}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        style={{ flex: '1 1 130px', padding: '0.3rem' }}
      />
      <button type="submit" style={{ padding: '0.3rem 0.6rem' }}>Add</button>
    </form>
  );
}
