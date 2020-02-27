const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const LojaController = require('./controllers/LojaController')
const CategoriasController = require('./controllers/CategoriasController')
const LojaCategoriasController = require('./controllers/LojaCategoriasController')
const NewLojaController = require('./controllers/NewLojaController')
const ProdutosController = require('./controllers/ProdutosController')
const ProdutosAdvancedController = require('./controllers/ProdutosAdvancedController')
const ProdutosCategoriasProdController = require('./controllers/ProdutosCategoriasProdController')
const CategoriasProdController = require('./controllers/CategoriasProdController')
const CaracteristicasController = require('./controllers/CaracteristicasController')
const ProdutosCaracteristicasController = require('./controllers/ProdutosCaracteristicasController')
const FotosProdController = require('./controllers/FotosProdController')
const ProdutosDescontosController = require('./controllers/ProdutosDescontosController')
const DescontosController = require('./controllers/DescontosController')
const PedidoController = require('./controllers/PedidoController')
const UserController = require('./controllers/UsersController')
const AddressController = require('./controllers/AddressController')
const AuthController = require('./controllers/AuthController')

const auth = require('./middlewares/auth')

const routes = express.Router()

//routes.use(auth)

//Loja

routes.get('/lojas',auth, LojaController.index)
routes.post('/lojas', LojaController.store)
routes.delete('/lojas/:loja_id', LojaController.delete)
routes.put('/lojas/:loja_id', LojaController.update)
routes.get('/lojasSelect', LojaController.select)

//Cadastro de loja

routes.post('/cadastrar_loja', multer(multerConfig).single('foto'), NewLojaController.store)


//Lojas próximas

routes.get('/lojasProx', LojaController.lojasProx)

//Categorias

routes.get('/categorias', CategoriasController.index)
routes.post('/categorias', CategoriasController.store)
routes.delete('/categorias/:categoria_id', CategoriasController.delete)
routes.put('/categorias/:categoria_id', CategoriasController.update)

//Loja Categorias

routes.get('/loja_categoria/:loja_id', LojaCategoriasController.index) // Retorna as categorias de uma loja
routes.post('/loja_categoria/:loja_id', LojaCategoriasController.store) // Adiciona uma categoria {body} a uma loja
routes.post('/loja_categorias/:loja_id', LojaCategoriasController.stores) // Adiciona várias categoria {body} a uma loja
routes.delete('/loja_categoria/:loja_id', LojaCategoriasController.delete) // Apaga a categoria {body} de uma loja
routes.get('/lojas_categoria_select', LojaCategoriasController.select) // Retorna todas as lojas de certa categoria {body}
routes.get('/lojas_categoria_select/:id', LojaCategoriasController.selectById) // Retorna todas as lojas de certa categoria {body}

//Produtos

routes.get('/produtos', ProdutosController.index)
routes.post('/produtos/:loja_id', ProdutosController.store)
routes.delete('/produtos/:produto_id', ProdutosController.delete)
routes.put('/produtos/:produto_id', ProdutosController.update)

//Produtos advanced

routes.get('/produtosLoja/:loja_id', ProdutosAdvancedController.selectByLoja)

//Produtos Categorias Prod

routes.get('/produtosCategoria/:produto_id', ProdutosCategoriasProdController.index)
routes.post('/produtosCategoria/:produto_id', ProdutosCategoriasProdController.store)
routes.delete('/produtosCategoria/:produto_id', ProdutosCategoriasProdController.delete)
routes.get('/produtosCategoria_select', ProdutosCategoriasProdController.select)
routes.get('/produtosCategoria_select/:id', ProdutosCategoriasProdController.selectById)

//Categorias Prod

routes.get('/categoriasProd', CategoriasProdController.index)
routes.post('/categoriasProd', CategoriasProdController.store)
routes.delete('/categoriasProd/:categoria_id', CategoriasProdController.delete)
routes.put('/categoriasProd/:categoria_id', CategoriasProdController.update)

//Caracteristicas

routes.get('/caracteristicas', CaracteristicasController.index)
routes.post('/caracteristicas', CaracteristicasController.store)
routes.delete('/caracteristicas/:caracteristicas_id', CaracteristicasController.delete)
routes.put('/caracteristicas/:caracteristicas_id', CaracteristicasController.update)

//Produtos Caracteristicas

routes.get('/produtosCaracteristicas/:produto_id', ProdutosCaracteristicasController.index)
routes.post('/produtosCaracteristicas/:produto_id', ProdutosCaracteristicasController.store)
routes.post('/produtosCaracteristicas/:produto_id/:caracteristica_id', ProdutosCaracteristicasController.storeById)
routes.delete('/produtosCaracteristicas/:produto_id', ProdutosCaracteristicasController.delete)
routes.get('/produtosCaracteristicas_select_tipo', ProdutosCaracteristicasController.selectByTipo)
routes.get('/produtosCaracteristicas_select_valor', ProdutosCaracteristicasController.selectByValor)
routes.get('/produtosCaracteristicas_select/:id', ProdutosCaracteristicasController.selectById)

//Fotos Prod

routes.get('/fotos_prod/:produto_id', FotosProdController.index)
routes.post('/fotos_prod/:produto_id', multer(multerConfig).single('foto'), FotosProdController.store)
routes.delete('/fotos_prod/:id', FotosProdController.delete)
routes.put('/fotos_prod/:id', multer(multerConfig).single('foto'), FotosProdController.update)

//Descontos

routes.get('/desconto/:produto_id', DescontosController.index)
routes.post('/desconto/:produto_id', DescontosController.store)
routes.delete('/desconto/:produto_id', DescontosController.delete)
routes.put('/desconto/:produto_id', DescontosController.update)

//Produtos Descontos

routes.get('/descontoProduto/:produto_id', ProdutosDescontosController.index)
routes.get('/produtosDesconto/:valor', ProdutosDescontosController.descSearch)

//Pedidos

routes.get('/pedido/:user_id', PedidoController.select) // Lista pedidos ativos da pessoa
routes.get('/pedidos/:user_id', PedidoController.index) // Lista pedidos ativos e inativos da pessoa
routes.get('/pedidoById/:id', PedidoController.selectById) // Retorna pedido específico
routes.post('/pedido/:user_id', PedidoController.store) // Cria pedido
routes.put('/pedido/:id', PedidoController.update) // Edita pedido específico
routes.delete('/pedido/:id', PedidoController.delete) // Exclui pedido específico
routes.put('/cesta/:id', PedidoController.concluded) // Atualiza pedido específico

//Usuários

routes.get('/users', UserController.index) // Lista todos os usuários
routes.post('/users', multer(multerConfig).single('foto'), UserController.store) // Criar usuário
routes.delete('/users/:id', UserController.delete)  // Deletar o usuário
routes.put('/users/:id', multer(multerConfig).single('foto'), UserController.update) //  Atualizar o usuário
routes.get('/usersSelect/:id', UserController.select) // Pesquisar usuário

//Endereços

routes.get('/endereco/:id', AddressController.index) // Retorna todos os endereços de um usuário
routes.post('/endereco/:id', AddressController.store)
routes.delete('/endereco/:id', AddressController.delete)
routes.put('/endereco/:id', AddressController.update)

//Authenticate

routes.post('/auth', AuthController.index)

module.exports = routes