const knex = require("knex");
const configuration = require("../../knexfile"); //pega as infos de configuração do banco

const connection = knex(configuration.development); // ambiente de desenvolvimento

module.exports = connection;
