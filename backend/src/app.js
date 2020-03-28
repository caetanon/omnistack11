const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports =  app;

/**
 * Métodos HTTP
 * 
 * GET: Buscar uma informação no backend
 * POST: Criar uma informação no backend
 * PUT: Alterar
 * DELETE: Deletar
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query Params: Parâmetros nomeados enviados na rota após o "?" (Filtros paginação...)
  * Route Params: Parâmetros utilizados para identificar recursos
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  * 
  */

/**
 * Database: SQLite
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */

// app.get('/', (req, resp) => {
//   return resp.json({
//     evento: "Semana OmniStack 11.0",
//     aluno: "Caetano Neto"
//   });
// });
