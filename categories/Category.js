const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//----------------------------------SINCRONIZAR NO BANCO apos criar tabelas comentar linha-------------------
//Category.sync({force: false}).then(() => {});
//-----------------------------------------------------------------------------------------------------------

module.exports = Category;