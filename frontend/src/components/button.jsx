// src/components/button.jsx

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.6em 1.2em',
        margin: '0.5em',
        borderRadius: '8px',
        border: '1px solid #ccc',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '1em',
      }}
    >
      {label}
    </button>
  )
}

export default Button
