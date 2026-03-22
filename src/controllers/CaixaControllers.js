const { caixa: Caixa,pagamentos: Pagamentos, sequelize} = require("../models")
class CaixaControllers {
  async store(req, res) {
    try {
      const { funcionario_id, saldo_inicial, saldo_final, data_abertura, data_fechamento, status } = req.body;

      if (!funcionario_id || !saldo_inicial) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
      }

      const caixaAlreadyExists = await Caixa.findOne({
        where: {data_fechamento: null}
      });

      if (caixaAlreadyExists) {
        return res.status(400).json({ message: " O caixa ja esta aberto!" });
      }

      const createdItem = await Caixa.create({ funcionario_id, saldo_inicial, saldo_final, data_abertura, data_fechamento , status });
      return res.status(201).json(createdItem);

    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Erro ao tentar adicionar o dado no caixa!" });
    }
  }

  async index(req, res) {
    try {

      const itens = await Caixa.findAll();
      return res.status(200).json(itens);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar os dados." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const dado = await Caixa.findByPk(id);

      if (!dado) {
        return res.status(404).json({ message: "Item não encontrado!" });
      }

      return res.status(200).json(dado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o dado específico." });
    }
  }

  async update(req, res) {
      try {
      const { id } = req.params;
      const dado = await Caixa.findByPk(id);

      if (!dado){
        return res.status(404).json({message: "caixa nao encotrado"})
      }
      if (dado.status === 'fechado'){
        return res.status(400).json({message: "caixa ja esta fechado"})

      }
      
      const totalPagamentos = await Pagamentos.findOne({
        attributes: [
          [sequelize.fn('SUM', sequelize.col('valor_total')), 'total']
        ],
        where: { caixa_id: id }
      });

      const total = totalPagamentos.dataValues.total || 0;
      const saldo_final = dado.saldo_inicial + parseFloat(total);

      await Caixa.update(
        { saldo_final, data_fechamento :new Date(), status:"fechado" },
        { where: { id } }
      );

      return res.status(200).json({ message: "Caixa atualizado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar os dados." });
    }
  }
}

module.exports = new CaixaControllers();