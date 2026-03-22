const { cardapio: Cardapio } = require("../models/")

class CardapioControllers {
  async store(req, res) {
    try {
      const { nome, detalhes, valor, categoria, disponivel } = req.body;

      if (!nome || !detalhes || !valor || !categoria || disponivel === undefined) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
      }

      const itemAlreadyExists = await Cardapio.findOne({
        where: { nome, detalhes }
      });

      if (itemAlreadyExists) {
        return res.status(400).json({ message: "Esse item no cardapio já existe!" });
      }

      const createdItem = await Cardapio.create({ nome, detalhes, valor, categoria, disponivel });
      return res.status(201).json(createdItem);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao tentar adicionar o item no cardapio!" });
    }
  }

  async index(req, res) {
    try {
      const itens = await Cardapio.findAll();
      return res.status(200).json(itens);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar os dados." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const item = await Cardapio.findByPk(id);

      if (!item) {
        return res.status(404).json({ message: "Item não encontrado!" });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o dado específico." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, detalhes, valor, categoria, disponivel } = req.body;

      const item = await Cardapio.findByPk(id);
      if (!item) {
        return res.status(404).json({ message: "Item não encontrado!" });
      }

      await Cardapio.update(
        { nome, detalhes, valor, categoria, disponivel },
        { where: { id } }
      );

      return res.status(200).json({ message: "Cardapio atualizado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar os dados." });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const item = await Cardapio.findByPk(id);
      if (!item) {
        return res.status(404).json({ message: "Item não encontrado!" });
      }

      await Cardapio.destroy({ where: { id } });
      return res.status(200).json({ message: "Item deletado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar o dado." });
    }
  }
}

module.exports = new CardapioControllers();