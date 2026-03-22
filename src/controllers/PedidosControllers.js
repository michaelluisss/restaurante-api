const { pedidos: Pedidos, mesas: Mesas, clientes: Clientes, pedidos_itens: PedidosItens, pagamentos: Pagamentos } = require("../models");

class PedidosControllers {
  async store(req, res) {
    try {
      const { mesa_id, cliente_id } = req.body;

      if (!mesa_id || !cliente_id) {
        return res.status(400).json({ message: "mesa_id e cliente_id são obrigatórios!" });
      }

      const mesa = await Mesas.findByPk(mesa_id);
      if (!mesa) {
        return res.status(404).json({ message: "Mesa não encontrada." });
      }

      const cliente = await Clientes.findByPk(cliente_id);
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }

      const createdPedido = await Pedidos.create({
        mesa_id,
        cliente_id,
        status: "aberto",
        data_abertura: new Date(),
      });

      return res.status(201).json(createdPedido);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao tentar adicionar pedido." });
    }
  }

  async index(req, res) {
    try {
      const pedidos = await Pedidos.findAll();
      return res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar pedidos." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedidos.findByPk(id);

      if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      return res.status(200).json(pedido);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar pedido." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || !["aberto", "fechado", "cancelado"].includes(status)) {
        return res.status(400).json({ message: "Status inválido. Use aberto, fechado ou cancelado." });
      }

      const pedido = await Pedidos.findByPk(id);
      if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      if (pedido.status === "fechado" && status !== "fechado") {
        return res.status(400).json({ message: "Pedido já fechado e não pode ser reaberto." });
      }

      if (pedido.status === status) {
        return res.status(200).json({ message: "Status do pedido já está nesse valor." });
      }

      await Pedidos.update(
        {
          status,
          data_fechamento: status === "fechado" ? new Date() : pedido.data_fechamento,
        },
        { where: { id } }
      );

      return res.status(200).json({ message: "Pedido atualizado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar pedido." });
    }
  }
}

module.exports = new PedidosControllers();