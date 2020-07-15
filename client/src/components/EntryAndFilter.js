import React from 'react';
import ModalTransactionNewEntry from './ModalTransactionNewEntry.js';

export default function EntryAndFilter({
  onChangeFilter,
  disabled = false,
  onSave,
}) {
  const handleInputChange = (event) => {
    onChangeFilter(event.target.value);
  };
  const handleSave = (transaction) => {
    onSave(transaction);
  };
  return (
    <div
      className="row center"
      style={{
        display: 'flex',
        direction: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <div className=" col s1 ">
        <ModalTransactionNewEntry onSave={handleSave} modalName="modal1" />
      </div>
      <div className=" col s11 row" style={{ display: 'flex' }}>
        <div className=" col s11">
          <input disabled={disabled} type="text" onChange={handleInputChange} />
        </div>
        <div className=" col s1">
          <i className="material-icons prefix">search</i>
        </div>
      </div>
    </div>
  );
}
