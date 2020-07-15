import React from 'react';

export default function ActionIcon({ type, onClick }) {
  const handleClick = (event) => {
    onClick(type);
  };
  return (
    <div>
      <span
        className="material-icons"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
        value={type}
      >
        {type}
      </span>
    </div>
  );
}
