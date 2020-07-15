import React from 'react';
import ActionIcon from './ActionIcon';
import formatHelper from '../helpers/formatHelper.js';

export default function Transaction({
  transaction,
  color,
  entry,
  onDelete,
  onEditClick,
}) {
  const styles = { ...style.transactionDiv, ...{ backgroundColor: color } };

  const handleEditClick = () => {
    onEditClick(transaction);
  };

  const handleActionIconClick = (value) => {
    if (value === 'delete') onDelete(transaction._id);
  };

  return (
    <div style={styles}>
      <div style={{ marginLeft: '5px', marginRight: '5px' }}>{entry + 1}</div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontWeight: 'bold' }}>{transaction.category}</div>
        <div style={{ fontSize: '0.8rem' }}>{transaction.description}</div>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {formatHelper.formatCurrency(`${transaction.type}${transaction.value}`)}
      </div>
      <div style={{ marginLeft: '5px', display: 'flex' }}>
        {/* Esta Tag faz o dispara o modal com nome transModal que está em Transactions*/}

        <a
          href="#transModal"
          className="modal-trigger material-icons"
          style={{ cursor: 'pointer', color: 'black', textAlign: 'center' }}
          onClick={handleEditClick}
        >
          edit
        </a>
        <ActionIcon type="delete" onClick={handleActionIconClick} />
      </div>
    </div>
  );
}

let style = {
  transactionDiv: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid black',
    marginBottom: '10px',
    borderRadius: '10px',
  },
};
