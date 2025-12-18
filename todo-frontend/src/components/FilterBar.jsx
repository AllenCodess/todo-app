export default function FilterBar({ filter, setFilter }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={() => setFilter('all')}
        disabled={filter === 'all'}
        style={{ marginRight: '0.5rem' }}
      >
        All
      </button>
      <button
        onClick={() => setFilter('completed')}
        disabled={filter === 'completed'}
        style={{ marginRight: '0.5rem' }}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter('pending')}
        disabled={filter === 'pending'}
      >
        Pending
      </button>
    </div>
  );
}
