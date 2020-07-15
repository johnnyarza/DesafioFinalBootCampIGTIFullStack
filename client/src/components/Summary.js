import React from 'react';
import css from '../css/summary.module.css';
import Balance from './Balance';
import Income from './Income';
import Outgoings from './Outgoings';
import EntriesCount from './EntriesCount';

export default function Summary({ transactions = [] }) {
  const receitas = transactions
    .filter((transaction) => transaction.type === '+')
    .map((transaction) => transaction.value)
    .reduce((acc, crr) => acc + crr, 0);

  const despesas = -transactions
    .filter((transaction) => transaction.type === '-')
    .map((transaction) => transaction.value)
    .reduce((acc, crr) => acc + crr, 0);
  return (
    <div className={`${css.div} row`}>
      <div className="col s3">
        <EntriesCount count={transactions.length} />
      </div>
      <div className="col s3">
        <Income receitas={receitas} />
      </div>

      <div className="col s3">
        <Outgoings despesas={despesas} />
      </div>

      <div className="col s3">
        <Balance receitas={receitas} despesas={despesas} />
      </div>
    </div>
  );
}
