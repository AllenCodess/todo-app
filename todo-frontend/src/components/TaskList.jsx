import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask} // pass it here
        />
      ))}
    </ul>
  );
}
