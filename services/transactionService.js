const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/

const transactionModel = require('../models/TransactionModel');

async function find(req, res) {
  try {
    let data;
    const { period, description } = req.query;

    if (!description) {
      data = await getData(period);
      console.log(`GET : Objects (${period ? '?period=' + period : ''})`);
    }

    if (period && description) {
      data = await getDataByDescription(description, period);
      console.log(
        `GET : Object (?period=${period}&description=${description})`
      );
    }

    res.send(data);
  } catch (err) {
    res.status(!!err.errNumber ? err.errNumber : 400).send(err.message);
  }
}

async function getDataByDescription(description = '', filter) {
  const regExFilter = /^[12]\d{3}-(0[1-9]|1[012])$/;

  if (!filter.match(regExFilter)) {
    throw { message: 'Informar periodo no formato AAAA-MM' };
  }

  if (!description) throw { message: 'Descrição vazia', errNumber: 406 };
  const regEx = new RegExp(description, 'i');
  return transactionModel
    .find({ yearMonth: filter, description: regEx })
    .sort({ yearMonthDay: 'asc' });
}

function getData(filter) {
  const regEx = /^[12]\d{3}-(0[1-9]|1[012])$/;

  if (filter) {
    if (!filter.match(regEx)) {
      throw { message: 'Informar periodo no formato AAAA-MM' };
    }
    return transactionModel
      .find({ yearMonth: filter })
      .sort({ yearMonthDay: 'asc' });
  }
  return transactionModel.find();
}

async function findDistinctPeriods(req, res) {
  try {
    const data = await transactionModel.distinct('yearMonth');
    console.log(`GET : Objects (.distinct('yearMonth'))`);
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function create(req, res) {
  try {
    const data = await transactionModel.create(req.body);
    console.log(`POST : Object (id=${data._id})`);
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function update(req, res) {
  try {
    const { _id } = req.query;
    console.log(_id);
    if (!_id) throw { message: 'Informar id do elemento', errNumber: 400 };
    const data = await transactionModel.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    console.log(`PUT : Object (id=${_id})`);
    res.send(data);
  } catch (err) {
    res.status(!!errNumber ? errNumber : 500).send(err.message);
  }
}

async function remove(req, res) {
  try {
    const { _id } = req.query;
    if (!_id) throw { message: 'Informar id do elemento', errNumber: 400 };
    const data = await transactionModel.findByIdAndDelete({ _id });
    if (!data)
      throw {
        message: 'Não foram encontrados elementos com esse id',
        errNumber: 404,
      };
    console.log(`DELETE : Object (id=${_id})`);
    res.send(data);
  } catch (err) {
    res.status(!!err.errNumber ? err.errNumber : 500).send(err.message);
  }
}

module.exports = { find, create, update, remove, findDistinctPeriods };
