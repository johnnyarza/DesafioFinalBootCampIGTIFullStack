import React, { useState, useEffect } from 'react';
import css from '../css/test.module.css';

export default function RadioButton({
  group,
  onChange,
  initialType = '+',
  disable = false,
}) {
  const [currType, setCurrType] = useState(initialType);

  const handleChange = (event) => {
    setCurrType(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    setCurrType(initialType);
  }, [initialType]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <p style={{ marginLeft: '5px', marginRight: '5px', color: 'red' }}>
            <label>
              <input
                className={css.radioColor}
                name={group}
                type="radio"
                onChange={handleChange}
                value="+"
                checked={currType === '+' ? true : false}
                disabled={disable}
              />

              <span style={{ color: 'white' }}>Receitas</span>
            </label>
          </p>
        </div>
        <div>
          <p style={{ marginLeft: '5px', marginRight: '5px' }}>
            <label>
              <input
                name={group}
                type="radio"
                onChange={handleChange}
                value="-"
                checked={currType === '-' ? true : false}
                disabled={disable}
              />
              <span style={{ color: 'white' }}>Despesas</span>
            </label>
          </p>
        </div>
      </div>
    </>
  );
}
