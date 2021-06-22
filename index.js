//-------------------------------------------1 passo-------------------------------------------
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

//-------------------------------Importar Controler-------------------------------------------
const categoriesController = require("./categories/CategoriesController")
const ArticlesController = require("./articles/ArticlesController")
const usersController = require("./users/UsersController")
//--------------------------------------------------------------------------------------------

//-------------------------------Importar Model-----------------------------------------------
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User")
//--------------------------------------------------------------------------------------------


//DATABASE ------------------------------------------------------------------------------------
connection
.authenticate()
.then(() => {
    console.log("Conexão feita com o banco de dados")
})
.catch((msgErro) => {
    console.log(msgErro);
})


// view engine - precisa ter uma pasta viws obrigatorio---------------------------------------
app.set('view engine','ejs');


// SESSAO -----------------------------------------------------------------------------------
// Redis - banco de dados ------------- Utilizar de projeto de grande porte para usar sessao e cache

app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 30000000 }
}))
/*
app.get("/session", (req , res) => {
    req.session.treinamento = "Formação Node.js"
    req.session.ano = 2019
    req.session.email = "marcelo@gmail.com"
    res.send("Sessão gerada");
});

app.get("/leitura", (req , res) => {
    res.json({
       treinamento: req.session.treinamento, 
       ano:req.session.ano
    })
});
*/

//-------------------------------------------------------------------------------------------


//arquivos staticos exeplo css ---------------------------------------------------------------
app.use(express.static('public'));



// Body parser para trabalhar com formularios buscar campos pela propriedade name-------------
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//--------------------------------------------------------------------------------------------

// Essse commnado fala para aplicação que quer usar as rotas do controlles importado---------
app.use("/", categoriesController);
app.use("/", ArticlesController);
app.use("/", usersController);
//--------------------------------------------------------------------------------------------

// Rota principal ----------------------------------------------------------------------------
app.get("/", (req,res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4

    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
})
//--------------------------------------------------------------------------------------------

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article",  {article: article, categories: categories});
            });
        }else{
            res.redirect("/");
        }

    }).catch(err => {
        res.redirect("/");
    });
})

// FILTRA MENU POR SLUG CHAMADA NA homenavbar.js <a class="nav-link" href="/category/<%= category.slug %>"><%= category.title%></a>
app.get("/category/:slug" ,(req, res) => {

    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
        
    }).then(category => {
        
        if(category != undefined){
            Category.findAll().then(categories => {
               

             //res.json(articles.category)   ;
               res.render("index",{articles : category.articles, categories: categories})

              
            });

        }else{
            res.redirect("/");
        }

    }).catch( err => {
        res.redirect("/");
    })
})

// sistema roda na porta 8080-----------------------------------------------------------------
//SERVER PRODUÇÃO ---------------------------------
//app.listen(80, () => {
//    console.log("Servidor esta rodando");
//})

app.listen(8080, () => {
    console.log("Servidor esta rodando");
}) 
//--------------------------------------------------------------------------------------------