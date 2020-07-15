import React, { useState } from 'react';
import Modal from 'react-modal';
import RadioButton from './RadioButton';

export default function EditTransactionModal({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const { _id, type } = selectedTransaction;
  const [transaction] = useState(selectedTransaction);
  const [yearMonthDay, setYearMonthDay] = useState(
    selectedTransaction.yearMonthDay
  );
  const [category, setCategory] = useState(selectedTransaction.category);
  const [description, setDescription] = useState(
    selectedTransaction.description
  );
  const [value, setValue] = useState(selectedTransaction.value);

  const handleClose = () => {
    unlockScroll();
    onClose();
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  const handleDescricaoChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setYearMonthDay(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    const newTransaction = {
      _id,
      description,
      value,
      category,
      year: yearMonthDay.substring(0, 4),
      month: yearMonthDay.substring(5, 7),
      day: yearMonthDay.substring(8),
      yearMonthDay,
      type,
    };
    event.preventDefault();
    unlockScroll();
    onSave(newTransaction);
    onClose();
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = 'yes';
  };
  const lockScroll = () => {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';
  };
  lockScroll();
  Modal.setAppElement('#aqui');

  return (
    <div>
      <Modal
        isOpen={true}
        style={{
          overlay: {
            zIndex: 999,
            transform: 'scale(0.8)',
            overflowY: 'hidden',
            backgroundColor: '#212121',
            borderRadius: '15px',
          },
          content: {
            borderBlock: '100px',
            borderBottom: '100px',
            backgroundColor: '#212121',
            borderRadius: '15px',
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a
              className="btn-floating btn-large waves-effect waves-light red"
              onClick={handleClose}
              href="#!"
            >
              <i className="material-icons">close</i>
            </a>
            <a
              className="btn-floating btn-large waves-effect waves-light green"
              onClick={handleSubmit}
              href="#!"
            >
              <i className="material-icons">done</i>
            </a>
          </div>

          <div
            style={{ display: 'flex', marginTop: '15px', marginBottom: '15px' }}
          >
            <RadioButton group="group1" type={transaction.type} />
          </div>
          <div className="input-field">
            <input
              id="descricao"
              type="text"
              value={!!description && description}
              onChange={handleDescricaoChange}
            ></input>
            <label className="active" htmlFor="descricao">
              Descrição
            </label>
          </div>

          <div className="input-field">
            <input
              id="categoria"
              type="text"
              value={!!category && category}
              onChange={handleCategoryChange}
            ></input>
            <label className="active" htmlFor="categoria">
              Categoria
            </label>
          </div>

          <div style={{ display: 'flex', alignContent: 'center' }}>
            <div className="input-field" style={{ marginRight: '10px' }}>
              <input
                id="value"
                type="number"
                value={!!value && value}
                onChange={handleValueChange}
              ></input>
              <label className="active" htmlFor="value">
                Valor
              </label>
            </div>

            <div className="input-field" style={{ marginLeft: '10px' }}>
              <label className="active">Data</label>
              <input
                type="date"
                onChange={handleDateChange}
                value={!!yearMonthDay && yearMonthDay}
              ></input>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
};
