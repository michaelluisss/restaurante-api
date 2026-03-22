//precisa testarrrrrrrrrrrrrrrrrrrrrrrr
const { pagamentos: Pagamentos } = require("../models")

class PagamentosControllers {
  async store(req, res) {
    try {
      const {pedido_id, caixa_id, forma_pagamento, valor_total, valor_pago, troco} = req.body;

      if ( !pedido_id || !caixa_id || !forma_pagamento || !valor_total || !valor_pago  ) {
        return res.status(400).json({ message: "pedido_id, caixa_id, forma_pagamento, valor_total, valor_pago são campos obrigatórios!" });
      }

      const pagamentoAlreadyExists = await Pagamentos.findOne({
        where: { pedido_id}
      });

      if (pagamentoAlreadyExists) {
        return res.status(400).json({ message: "Essa pagamento existe!" });
      }

      const createdPagamento = await Pagamentos.create({pedido_id, caixa_id, forma_pagamento, valor_total, valor_pago, troco});
      return res.status(201).json(createdPagamento);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao tentar adicionar a pagamento!" });
    }
  }

  async index(req, res) {
    try {
      const pagamento = await Pagamentos.findAll();
      return res.status(200).json(pagamento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar os dados." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const pagamento = await Pagamentos.findByPk(id);

      if (!pagamento) {
        return res.status(404).json({ message: "Pagamento não encontrado!" });
      }

      return res.status(200).json(pagamento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o dado específico." });
    }
  }

}

module.exports = new PagamentosControllers();