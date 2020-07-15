import React from 'react';

export default function SelectPeriod({ value, onChange, periods }) {
  const handleChange = (event) => {
    onChange(event);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div style={{ padding: '10px' }}>
      <form onSubmit={handleSubmit}>
        <select
          className="browser-default"
          value={value}
          onChange={handleChange}
          style={{ fontSize: '0.9rem' }}
        >
          <option value="" disabled>
            Escolha o período
          </option>
          {periods.map((period) => {
            return (
              <option key={period} value={period}>
                {period}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}
