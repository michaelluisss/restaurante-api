const { pedidos: Pedidos, pedidos_itens: PedidosItens, cardapio: Cardapio } = require("../models");

class PedidosItensControllers {
  async store(req, res) {
    try {
      const { id: pedido_id } = req.params;
      const { cardapio_id, quantidade, preco_unit } = req.body;

      if (!pedido_id || !cardapio_id || !quantidade || !preco_unit) {
        return res.status(400).json({ message: "pedido_id, cardapio_id, quantidade e preco_unit são obrigatórios." });
      }

      const pedido = await Pedidos.findByPk(pedido_id);
      if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      if (pedido.status !== "aberto") {
        return res.status(400).json({ message: "Só é possível adicionar item em pedido aberto." });
      }

      const itemCardapio = await Cardapio.findByPk(cardapio_id);
      if (!itemCardapio) {
        return res.status(404).json({ message: "Item do cardápio não encontrado." });
      }

      const createdItem = await PedidosItens.create({
        pedido_id,
        cardapio_id,
        quantidade,
        preco_unit,
      });

      return res.status(201).json(createdItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao adicionar item no pedido." });
    }
  }

  async index(req, res) {
    try {
      const { id: pedido_id } = req.params;

      const pedido = await Pedidos.findByPk(pedido_id);
      if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }

      const itens = await PedidosItens.findAll({ where: { pedido_id } });
      return res.status(200).json(itens);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar itens do pedido." });
    }
  }

  async show(req, res) {
    try {
      const { id: pedido_id, itemId } = req.params;

      const item = await PedidosItens.findOne({
        where: {
          id: itemId,
          pedido_id,
        },
      });

      if (!item) {
        return res.status(404).json({ message: "Item não encontrado para esse pedido." });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar item do pedido." });
    }
  }

  async update(req, res) {
    try {
      const { id: pedido_id, itemId } = req.params;
      const { quantidade, preco_unit } = req.body;

      const item = await PedidosItens.findOne({
        where: { id: itemId, pedido_id },
      });

      if (!item) {
        return res.status(404).json({ message: "Item do pedido não encontrado." });
      }

      if (quantidade !== undefined && (quantidade <= 0 || !Number.isInteger(Number(quantidade)))) {
        return res.status(400).json({ message: "Quantidade deve ser inteiro maior que zero." });
      }

      await PedidosItens.update(
        { quantidade: quantidade ?? item.quantidade, preco_unit: preco_unit ?? item.preco_unit },
        { where: { id: itemId, pedido_id } }
      );

      return res.status(200).json({ message: "Item do pedido atualizado." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar item do pedido." });
    }
  }

  async destroy(req, res) {
    try {
      const { id: pedido_id, itemId } = req.params;

      const item = await PedidosItens.findOne({ where: { id: itemId, pedido_id } });
      if (!item) {
        return res.status(404).json({ message: "Item do pedido não encontrado." });
      }

      await PedidosItens.destroy({ where: { id: itemId, pedido_id } });
      return res.status(200).json({ message: "Item removido do pedido." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao remover item do pedido." });
    }
  }
}

module.exports = new PedidosItensControllers();