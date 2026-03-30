const { Router } = require("express");
const FuncionariosControllers = require("./controllers/FuncionariosControllers");
const ClientesControllers = require("./controllers/ClientesControllers");
const CardapioControllers = require("./controllers/CardapioControllers");
const MesasControllers = require("./controllers/MesasControllers");
const PagamentosControllers = require("./controllers/PagamentosControllers");
const CaixaControllers = require("./controllers/CaixaControllers");
const PedidosControllers = require("./controllers/PedidosControllers");
const PedidosItensControllers = require("./controllers/Pedidos_ItensControllers");
const routes = Router();
const verificarToken = require("./middleware/auth");

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});
//controle de login
routes.post('/login', FuncionariosControllers.login);

// Controle de Funcionarios
routes.post('/funcionarios', verificarToken, FuncionariosControllers.store);
routes.get('/funcionarios',verificarToken, FuncionariosControllers.index);
routes.get('/funcionarios/:id', verificarToken, FuncionariosControllers.show);
routes.put('/funcionarios/:id', verificarToken, FuncionariosControllers.update);
routes.delete('/funcionarios/:id', verificarToken, FuncionariosControllers.destroy);

// Controle de Clientes
routes.post('/clientes', verificarToken, ClientesControllers.store);
routes.get('/clientes', verificarToken, ClientesControllers.index);
routes.get('/clientes/:id', verificarToken, ClientesControllers.show);
routes.put('/clientes/:id', verificarToken, ClientesControllers.update);
routes.delete('/clientes/:id', verificarToken, ClientesControllers.destroy);

// Controle do Cardapio
routes.post('/cardapio', verificarToken, CardapioControllers.store);
routes.get('/cardapio', verificarToken, CardapioControllers.index);
routes.get('/cardapio/:id', verificarToken, CardapioControllers.show);
routes.put('/cardapio/:id', verificarToken, CardapioControllers.update);
routes.delete('/cardapio/:id', verificarToken, CardapioControllers.destroy);

// Controle de Mesas
routes.post('/mesas', verificarToken, MesasControllers.store);
routes.get('/mesas', verificarToken, MesasControllers.index);
routes.get('/mesas/:id', verificarToken, MesasControllers.show);
routes.patch('/mesas/:id/status', verificarToken, MesasControllers.update);
routes.delete('/mesas/:id', verificarToken, MesasControllers.destroy);

// Controle de Pedidos
routes.post('/pedidos', verificarToken, PedidosControllers.store);
routes.get('/pedidos', verificarToken, PedidosControllers.index);
routes.get('/pedidos/:id', verificarToken, PedidosControllers.show);
routes.patch('/pedidos/:id/status', verificarToken, PedidosControllers.update);

// Controle de Pedidos Itens
routes.post('/pedidos/:id/itens', verificarToken, PedidosItensControllers.store);
routes.get('/pedidos/:id/itens', verificarToken, PedidosItensControllers.index);
routes.get('/pedidos/:id/itens/:itemId', verificarToken, PedidosItensControllers.show);
routes.patch('/pedidos/:id/itens/:itemId', verificarToken, PedidosItensControllers.update);
routes.delete('/pedidos/:id/itens/:itemId', verificarToken, PedidosItensControllers.destroy);

// Controle de Pagamentos
routes.post('/pagamentos', verificarToken, PagamentosControllers.store);
routes.get('/pagamentos', verificarToken, PagamentosControllers.index);
routes.get('/pagamentos/:id', verificarToken, PagamentosControllers.show);

routes.post('/caixa/abrir', verificarToken, CaixaControllers.store);
routes.get('/caixa', verificarToken, CaixaControllers.index);
routes.get('/caixa/:id', verificarToken, CaixaControllers.show);
routes.patch('/caixa/:id/fechar', verificarToken, CaixaControllers.update);

module.exports = routes;