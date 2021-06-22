
const { Sequelize } = require('sequelize');

/* Conexao Produção WEB*/

//const connection = new Sequelize('DB_INTEGRACAO', 'root', '297553', {
  // host: 'localhost',
  //dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  // timezone: "-03:00"
 //});
 
/* Conexao Produção LOCAL*/
 const connection = new Sequelize('DB_INTEGRACAO', 'sa', '297553', {
 host: 'localhost',
 dialect: 'mssql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
 timezone: "-03:00"
  
 }); 



  module.exports = connection;