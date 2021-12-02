if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

//Importação de módulos do Node.js
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//Importação de módulos locais
const indexRouter = require('./routes/index')
const cityRouter = require('./routes/cities')
const cities = require("./controllers/city")

//Criação da aplicação express
const app = express()
const router = express.Router()

//Instação dos middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(bodyParser.json())

//Instalação dos middlewares de arquivos de rotas
app.use('/', indexRouter)
app.use('/cities', cityRouter)

//Definição do middleware para acessar as solicitações enviadas à API
//Enviar mensagem padrão
router.use(function (req, res, next) {
  console.log("Seja-bem vindo ao middleware da API Business.")
  next(); //Indica chamada para a próxima rota.
});

//Rota padrão para verificação do funcionamento da aplicação
//Deve ser acessada por: GET http://localhost:3000/api
router.get('/', function (req, res) {
  res.json({ message: "Seja bem-vindo à API Business." });
});

//Definição de uma rota com prefixo '/api' para todas as demais rotas
app.use('/api', router)

//Configuração da view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

//Configuração do acesso ao MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('A conexão com o Mongodb foi realizada com sucesso.'))

// Retornar a listagem de todas as cidades
router.get("/cities", cities.findAllCities)

// Cadastrar uma cidade
router.post("/cities", cities.createCity)

// Excluir todas as cidades
router.delete("/cities", cities.deleteAllCities)

// Listar as informações de uma única cidade pelo id
router.get("/cities/:id", cities.findCityById)

// Atualizar as informações de uma única cidade pelo id
router.put("/cities/:id", cities.updateCityById)

// Excluir uma cidade específica pelo id
router.delete("/cities/:id", cities.deleteCityById)

//Inicialização do servidor na porta 3000
app.listen(process.env.PORT || 3000)

module.exports = app