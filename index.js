const envPath = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

// Usar variaveis de ambiente
require('dotenv').config({ path: envPath });

const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const Raven = require('./app/services/sentry');

const dbConfig = require('./config/database');


mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());

// esse Handler fica antes das rotas
app.use(Raven.requestHandler());

app.use('/api', require('./app/routes'));

// esse Handler fica depois das rotas
app.use(Raven.errorHandler());
app.listen(process.env.PORT || 3000);

module.exports = app;
