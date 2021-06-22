const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

//teste

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//RELACIONAMENTOS -------------------------------------------------------------------------------------

Category.hasMany(Article);  // Relacionamento que um para muitos
Article.belongsTo(Category); // Relacionamento que um artibo pertence a uma categoria 1 para 1

//----------------------------------SINCRONIZAR NO BANCO-----------------------------------------------
//Article.sync({force: false}).then(() => {});
//-----------------------------------------------------------------------------------------------------

module.exports = Article;