let mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.MONGO_URL;
const database = 'leetcode';

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`${url}/${database}`)
      .then(() => {
        console.log('Database connection successfull');
      })
      .catch(() => {
        console.error('Database connection error');
      });
  }
}

module.exports = new Database();

