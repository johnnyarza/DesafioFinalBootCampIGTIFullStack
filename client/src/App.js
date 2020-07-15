import React, { useState, useEffect } from 'react';
import SelectPeriod from './components/SelectPeriod';
import transactionService from './services/TransactionService';
import ChangePeriodButton from './components/ChangePeriodButton';
import '../src/css/selectPeriod.css';
import EntryAndFilter from './components/EntryAndFilter';
import Summary from './components/Summary';
import Transactions from './components/Transactions';
import Spinner from './components/Spinner';
import M from 'materialize-css';
import datePickerOptions from './helpers/datePickerOptions.js';
import ModalTransaction from './components/ModalTransaction.js';

export default function App() {
  const [period, setPeriod] = useState('');
  const [periods, setPeriods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState('');

  document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
    let datePickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datePickers, datePickerOptions);
  });

  useEffect(() => {
    const getDistinctPeriods = async () => {
      const data = await transactionService.getDistinctPeriods();
      setPeriods(data.data);
    };
    getDistinctPeriods();
  }, [newTransaction]);

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      const data = await transactionService.getTransactions(
        period,
        filterValue
      );
      setTransactions(data.data);
      setIsLoading(false);
    };
    if (!!period) {
      get();
    }
  }, [period, filterValue]);

  const getTransactions = async () => {
    setIsLoading(true);
    const data = await transactionService.getTransactions(period, filterValue);
    setTransactions(data.data);
    setIsLoading(false);
  };

  const handleListChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleClickPeriodButton = (value) => {
    const oldIndex = periods.indexOf(period);
    let newIndex;

    if (value === 'arrow_forward') {
      newIndex = oldIndex + 1;
    }
    if (value === 'arrow_back') {
      newIndex = oldIndex - 1;
    }
    if (newIndex < 0)
      M.toast({ html: 'Fim da Lista', classes: 'red darken-4 rounded' });
    setPeriod(newIndex < 0 ? periods[0] : periods[newIndex]);
  };

  const handleFilterChange = async (value) => {
    setFilterValue(value);
    getTransactions();
  };

  const deleteTransaction = async (_id) => {
    setIsLoading(true);
    const res = await transactionService.deleteTransaction(_id);
    const data = await res.data;
    getTransactions();
    M.toast({
      html: 'Lançamento Deletado',
      classes: 'green darken-4 rounded',
    });
    return data;
  };

  const updateTransaction = async (entry = {}) => {
    try {
      setIsLoading(true);
      const _id = entry._id;
      delete entry._id;

      const res = await transactionService.updateTransaction(_id, entry);
      const data = await res.data;
      getTransactions();
      M.toast({
        html: 'Lançamento Atualizado',
        classes: 'green darken-4 rounded',
      });
      return data;
    } catch (error) {
      M.toast({
        html: `Erro ao atualizar ${error.message}`,
        classes: ' red darken-4 rounded',
      });
    }
  };

  const postTransaction = async (transaction) => {
    try {
      const res = await transactionService.postTransaction(transaction);
      const data = res.data;

      M.toast({
        html: `Lançamento Salvo, id= ${data._id}`,
        classes: ' green darken-4 rounded',
      });
      setNewTransaction(data);
      if (!!period) getTransactions();
      return data;
    } catch (err) {
      M.toast({
        html: `Erro ao salvar ${err.message}`,
        classes: ' red darken-4 rounded',
      });
      setIsLoading(false);
    }
  };

  const handleNewEntry = (newTransaction) => {
    postTransaction(newTransaction);
  };
  const handleTransactionActionButton = async (_id, type, newTransaction) => {
    if (type === 'delete') await deleteTransaction(_id);
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
  };
  return (
    <div>
      <div className="navbar-fixed center ">
        <nav className="nav-extended grey darken-4" id="aqui">
          <div
            className="nav-background  grey darken-3"
            id="aqui"
            style={{ borderRadius: '5px' }}
          >
            <div className="nav-wrapper " style={{ minHeight: '30px' }}>
              <h5 style={{ fontWeight: 'bold', height: '15px' }}>
                Desafio Final BootCamp
              </h5>
            </div>
            <div className="nav-wrapper">
              <h5>Controle Financeiro</h5>
            </div>
            <div className="nav-wrapper">
              <div id="period-form">
                <ul>
                  <li>
                    {' '}
                    <ChangePeriodButton
                      icon="arrow_back"
                      onClick={handleClickPeriodButton}
                    />
                  </li>
                  <li>
                    <SelectPeriod
                      value={period}
                      onChange={handleListChange}
                      periods={periods}
                    />
                  </li>
                  <li>
                    <ChangePeriodButton
                      icon="arrow_forward"
                      onClick={handleClickPeriodButton}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="nav-wrapper"
              style={{ marginRight: '5px', marginLeft: '5px', height: '70px' }}
            >
              <Summary transactions={transactions} />
            </div>
            <div className="nav-wrapper " style={{ height: '75px' }}>
              <EntryAndFilter
                onChangeFilter={handleFilterChange}
                onSave={handleNewEntry}
                disabled={!period}
              />
            </div>
          </div>
        </nav>
      </div>

      <div
        className="container"
        style={{
          padding: '15px',
          marginTop: '290px',
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          !!transactions && (
            <Transactions
              onClick={handleTransactionActionButton}
              transactions={transactions}
              onEditClik={handleEditClick}
            />
          )
        )}
      </div>

      <ModalTransaction
        modalName="transModal"
        transaction={selectedTransaction}
        onUpdate={updateTransaction}
      />
    </div>
  );
}
