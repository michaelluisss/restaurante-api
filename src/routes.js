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

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

// Controle de Funcionarios
routes.post('/funcionarios', FuncionariosControllers.store);
routes.get('/funcionarios', FuncionariosControllers.index);
routes.get('/funcionarios/:id', FuncionariosControllers.show);
routes.put('/funcionarios/:id', FuncionariosControllers.update);
routes.delete('/funcionarios/:id', FuncionariosControllers.destroy);

// Controle de Clientes
routes.post('/clientes', ClientesControllers.store);
routes.get('/clientes', ClientesControllers.index);
routes.get('/clientes/:id', ClientesControllers.show);
routes.put('/clientes/:id', ClientesControllers.update);
routes.delete('/clientes/:id', ClientesControllers.destroy);

// Controle do Cardapio
routes.post('/cardapio', CardapioControllers.store);
routes.get('/cardapio', CardapioControllers.index);
routes.get('/cardapio/:id', CardapioControllers.show);
routes.put('/cardapio/:id', CardapioControllers.update);
routes.delete('/cardapio/:id', CardapioControllers.destroy);

// Controle de Mesas
routes.post('/mesas', MesasControllers.store);
routes.get('/mesas', MesasControllers.index);
routes.get('/mesas/:id', MesasControllers.show);
routes.patch('/mesas/:id/status', MesasControllers.update);
routes.delete('/mesas/:id', MesasControllers.destroy);

// Controle de Pedidos
routes.post('/pedidos', PedidosControllers.store);
routes.get('/pedidos', PedidosControllers.index);
routes.get('/pedidos/:id', PedidosControllers.show);
routes.patch('/pedidos/:id/status', PedidosControllers.update);

// Controle de Pedidos Itens
routes.post('/pedidos/:id/itens', PedidosItensControllers.store);
routes.get('/pedidos/:id/itens', PedidosItensControllers.index);
routes.get('/pedidos/:id/itens/:itemId', PedidosItensControllers.show);
routes.patch('/pedidos/:id/itens/:itemId', PedidosItensControllers.update);
routes.delete('/pedidos/:id/itens/:itemId', PedidosItensControllers.destroy);

// Controle de Pagamentos
routes.post('/pagamentos', PagamentosControllers.store);
routes.get('/pagamentos', PagamentosControllers.index);
routes.get('/pagamentos/:id', PagamentosControllers.show);

routes.post('/caixa/abrir', CaixaControllers.store);
routes.get('/caixa', CaixaControllers.index);
routes.get('/caixa/:id', CaixaControllers.show);
routes.patch('/caixa/:id/fechar', CaixaControllers.update);

module.exports = routes;