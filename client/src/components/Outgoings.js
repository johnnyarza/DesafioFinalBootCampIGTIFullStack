import React from 'react';
import formatHelper from '../helpers/formatHelper.js';

export default function Outgoings({ despesas }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '5px' }}>
        <i className="material-icons">trending_down</i>
      </div>
      <div>
        Despesas:
        <span style={{ color: '#ff5e57', fontWeight: 'bold' }}>
          {` ${formatHelper.formatCurrency(despesas)} `}
        </span>
      </div>
    </div>
  );
}
