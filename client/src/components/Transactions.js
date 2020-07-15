import React, { useState } from 'react';

import Transaction from './Transaction.js';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function Transactions({ transactions, onClick, onEditClik }) {
  const [selectedTransaction, setSelectedTransaction] = useState({});

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    onEditClik(transaction);
  };

  const handleDelete = (_id) => {
    onClick(_id, 'delete');
  };
  return (
    <>
      <div style={{ zIndex: 0 }}>
        {transactions.map((transaction, index) => {
          let color = transaction.type === '-' ? '#ff5e57' : '#2BBBAD';

          return (
            <Transaction
              key={transaction._id}
              transaction={transaction}
              color={color}
              entry={index}
              onDelete={handleDelete}
              onEditClick={handleEditClick}
            />
          );
        })}
      </div>
      <div style={{ zIndex: 1000 }}></div>
    </>
  );
}
