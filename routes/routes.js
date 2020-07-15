const express = require('express');
const transactionRouter = express();
const transactionService = require('../services/transactionService');

transactionRouter.get('/', transactionService.find);
transactionRouter.get(
  '/periods/distinct',
  transactionService.findDistinctPeriods
);
transactionRouter.post('/', transactionService.create);
transactionRouter.put('/', transactionService.update);
transactionRouter.delete('/', transactionService.remove);

module.exports = transactionRouter;
