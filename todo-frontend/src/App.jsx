import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortByPriority, setSortByPriority] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (!loggedIn) return;

    fetch('http://127.0.0.1:5000/tasks', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, [loggedIn]);

  const toggleComplete = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'PATCH',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, completed: data.completed } : task
        ));
      })
      .catch(err => console.error(err));
  };

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(err => console.error(err));
  };

  const addTask = (task) => {
    fetch('http://127.0.0.1:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => setTasks([...tasks, { ...task, id: data.id }]))
      .catch(err => console.error(err));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  const displayedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortByPriority) return 0;
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  if (!loggedIn) {
    return showRegister ? (
      <>
        <RegisterForm setRegistered={() => setShowRegister(false)} />
        <p>
          Already have an account?{' '}
          <button onClick={() => setShowRegister(false)}>Login here</button>
        </p>
      </>
    ) : (
      <>
        <LoginForm setLoggedIn={setLoggedIn} />
        <p>
          Don't have an account?{' '}
          <button onClick={() => setShowRegister(true)}>Register here</button>
        </p>
      </>
    );
  }

  return (
    <div className="container">
      <h1>To-Do App</h1>

      <TaskForm addTask={addTask} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <button
        onClick={() => setSortByPriority(!sortByPriority)}
        style={{ marginBottom: '1rem' }}
      >
        {sortByPriority ? 'Clear Sorting' : 'Sort by Priority'}
      </button>

      <TaskList tasks={displayedTasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />

      <button
        onClick={() => {
          fetch('http://127.0.0.1:5000/logout', {
            method: 'POST',
            credentials: 'include'
          }).then(() => setLoggedIn(false));
        }}
        style={{ marginTop: '1rem' }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
