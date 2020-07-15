import React from 'react';

export default function EntriesCount({ count }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '5px' }}>
        <i className="material-icons">format_list_numbered</i>
      </div>
      <div>
        Lançamentos:
        <span style={{ fontWeight: 'bold' }}>{` ${count} `}</span>
      </div>
    </div>
  );
}
