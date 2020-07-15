import React, { useState, useEffect } from 'react';
import RadioButton from './RadioButton';
import css from '../css/test.module.css';
import M from 'materialize-css';
import dateHelper from '../helpers/dateHelper.js';

export default function ModalTransaction({
  icon = 'add',
  onUpdate,
  modalName,
  transaction = {},
}) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [yearMonthDay, setYearMonthDay] = useState(
    dateHelper.getLocalDateNow()
  );
  const [type, setType] = useState('+');

  const owner = document.getElementById(modalName);
  if (owner) {
    const labels = document
      .getElementById(modalName)
      .getElementsByTagName('label');

    Object.values(labels).forEach((e) => e.classList.add('active'));
  }

  useEffect(() => {
    setDescription(transaction.description || '');
    setValue(transaction.value || '');
    setCategory(transaction.category || '');
    setType(transaction.type || '+');
    setYearMonthDay(transaction.yearMonthDay || dateHelper.getLocalDateNow());
  }, [transaction]);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setYearMonthDay(event.target.value);
  };
  const handleChangeRadioButton = (type) => {
    setType(type);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const checkFields = (obj = {}) => {
    let isOk = true;
    for (let [key, value] of Object.entries(obj)) {
      if (value === '' || String(value).trim() === '') {
        M.toast({ html: `Campo ${key} está vazio`, classes: 'red rounded' });
        isOk = false;
      }
    }
    return isOk;
  };

  const handleUpdate = () => {
    const newTransaction = {
      description,
      value,
      category,
      year: yearMonthDay.substring(0, 4),
      month: yearMonthDay.substring(5, 7),
      day: yearMonthDay.substring(8),
      yearMonth: `${yearMonthDay.substring(0, 4)}-${yearMonthDay.substring(
        5,
        7
      )}`,
      yearMonthDay,
      type,
    };
    newTransaction._id = transaction._id;
    if (checkFields(newTransaction)) onUpdate(newTransaction);
  };

  return (
    <div>
      <div
        id={modalName}
        className={`modal grey darken-4`}
        style={{ borderRadius: '10px', overflow: 'visible' }}
      >
        <div className="modal-content">
          <h4 className="center" style={{ color: 'white' }}>
            Editar Lançamento
          </h4>

          <div style={{ display: 'flex' }}>
            <RadioButton
              group="group2"
              onChange={handleChangeRadioButton}
              initialType={type}
              disable={true}
            />
          </div>
          <form>
            <div className="input-field" style={{ padding: '10px' }}>
              <input
                id={`categoryInput${modalName}`}
                type="text"
                style={{ borderBottom: 'solid 1px #2BBBAD', color: 'white' }}
                onChange={handleCategoryChange}
                value={category}
              />
              <label
                id={`categoryLabel${modalName}`}
                htmlFor={`categoryInput${modalName}`}
                style={{ marginLeft: '5px' }}
                className="active"
              >
                Categoria
              </label>
            </div>

            <div className="input-field" style={{ padding: '10px' }}>
              <input
                id={`valueDesciption${modalName}`}
                type="text"
                style={{ borderBottom: 'solid 1px #2BBBAD', color: 'white' }}
                onChange={handleChangeDescription}
                value={description}
              />

              <label
                id={`descriptionLabel${modalName}`}
                htmlFor={`valueDesciption${modalName}`}
                style={{ marginLeft: '5px' }}
                className="active"
              >
                Descrição
              </label>
            </div>

            <div style={{ display: 'flex' }}>
              <div className="input-field" style={{ padding: '10px' }}>
                <input
                  id={`valueEtry${modalName}`}
                  type="number"
                  style={{ borderBottom: 'solid 1px #2BBBAD', color: 'white' }}
                  onChange={handleValueChange}
                  step="0.01"
                  value={value}
                />

                <label
                  htmlFor={`valueEtry${modalName}`}
                  style={{ marginLeft: '5px' }}
                  className={'active'}
                >
                  Valor
                </label>
              </div>

              <div className="input-field " style={{ padding: '10px' }}>
                <input
                  id={`entryDate${modalName}`}
                  type="date"
                  style={{ borderBottom: 'solid 1px #2BBBAD', color: 'white' }}
                  onChange={handleDateChange}
                  value={yearMonthDay}
                />
                <label
                  htmlFor={`entryDate${modalName}`}
                  style={{ marginLeft: '5px' }}
                >
                  Data
                </label>
              </div>
            </div>

            <div
              className={` ${css.modal}`}
              style={{ backgroundColor: 'grey darken-4' }}
            >
              <a
                href="#modalTrans"
                className="modal-close  waves-green btn"
                onClick={handleUpdate}
              >
                Salvar
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
