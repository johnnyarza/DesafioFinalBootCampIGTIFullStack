import http from './http-common.js';

function getDistinctPeriods() {
  return http.get('/api/transaction/periods/distinct');
}

function getTransactions(period = '', filterValue = '') {
  let query = `period=${period}`;
  if (filterValue) {
    query += `&description=${filterValue}&`;
  }
  return http.get(`/api/transaction?${query}`);
}

function deleteTransaction(query = '') {
  return http.delete(`/api/transaction?_id=${query}`);
}

function updateTransaction(query = '', data) {
  return http.put(`/api/transaction?_id=${query}`, data);
}

function postTransaction(data) {
  return http.post('/api/transaction', data);
}

export default {
  getDistinctPeriods,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  postTransaction,
};
