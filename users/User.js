const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('Tb_users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//----------------------------------SINCRONIZAR NO BANCO apos criar tabelas comentar linha-------------------
//User.sync({force: false}).then(() => {});
//-----------------------------------------------------------------------------------------------------------

module.exports = User;