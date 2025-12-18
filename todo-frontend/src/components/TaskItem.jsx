export default function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <li
      style={{
        cursor: 'pointer',
        textDecoration: task.completed ? 'line-through' : 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.3rem 0',
        borderBottom: '1px solid #ddd'
      }}
    >
      <div 
        onClick={() => toggleComplete(task.id)} 
        style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}
      >
        <span style={{ minWidth: '150px' }}>{task.title}</span>
        <span style={{ minWidth: '60px' }}>({task.priority})</span>
        {task.due_date && <span style={{ minWidth: '100px' }}>Due: {task.due_date}</span>}
        {task.completed && <span>✓</span>}
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          marginLeft: '1rem',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '0.3rem 0.5rem',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </li>
  );
}
