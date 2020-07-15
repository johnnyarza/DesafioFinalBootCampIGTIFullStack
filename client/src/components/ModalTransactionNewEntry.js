import React, { useState } from 'react';
import RadioButton from './RadioButton';
import css from '../css/test.module.css';
import M from 'materialize-css';

export default function ModalTransaction({ icon = 'add', onSave, modalName }) {
  let localDateNow = new Date();
  localDateNow = localDateNow.toLocaleDateString('sv-SE');

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [yearMonthDay, setYearMonthDay] = useState(localDateNow);
  const [type, setType] = useState('+');

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
      console.log(key, value);
      if (value === '' || String(value).trim() === '') {
        M.toast({ html: `Campo ${key} está vazio`, classes: 'red rounded' });
        isOk = false;
      }
    }
    return isOk;
  };

  const handleSave = () => {
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
    if (checkFields(newTransaction)) {
      onSave(newTransaction);
      setDescription('');
      setValue('');
      setCategory('');
      setType('+');
    }
  };

  return (
    <div>
      <i
        id={`icon${modalName}`}
        href={`#${modalName}`}
        className="modal-trigger material-icons"
        style={{ cursor: 'pointer', color: '#2bbbad', textAlign: 'center' }}
      >
        {icon}
      </i>

      <div
        id={modalName}
        className={`modal grey darken-4`}
        style={{ borderRadius: '10px', overflow: 'visible' }}
      >
        <div className="modal-content">
          <h4>Novo Lançamento</h4>

          <div style={{ display: 'flex' }}>
            <RadioButton
              group="group1"
              onChange={handleChangeRadioButton}
              initialType={type}
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
                htmlFor={`categoryInput${modalName}`}
                style={{ marginLeft: '5px' }}
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
                htmlFor={`valueDesciption${modalName}`}
                style={{ marginLeft: '5px' }}
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
                  className="active"
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
                href="#!"
                className="modal-close  waves-green btn"
                onClick={handleSave}
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
