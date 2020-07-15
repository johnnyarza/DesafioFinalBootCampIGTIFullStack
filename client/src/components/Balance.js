import React from 'react';
import formatHelper from '../helpers/formatHelper.js';

export default function Balance({ receitas, despesas }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '5px' }}>
        <i className="material-icons">account_balance_wallet</i>
      </div>
      <div>
        Saldo:
        <span
          style={{
            color: receitas + despesas > 0 ? '#05c46b' : '#ff5e57',
            fontWeight: 'bold',
          }}
        >{` ${formatHelper.formatCurrency(receitas + despesas)}`}</span>
      </div>
    </div>
  );
}
