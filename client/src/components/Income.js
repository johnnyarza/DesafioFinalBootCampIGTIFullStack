import React from 'react';
import formatHelper from '../helpers/formatHelper.js';

export default function Income({ receitas }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '5px' }}>
        <i className="material-icons">trending_up</i>
      </div>
      <div>
        Receitas:
        <span style={{ color: '#05c46b', fontWeight: 'bold' }}>
          {` ${formatHelper.formatCurrency(receitas)} `}
        </span>
      </div>
    </div>
  );
}
