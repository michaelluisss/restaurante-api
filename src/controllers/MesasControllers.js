const { mesas: Mesas } = require("../models/")

class MesasControllers {
  async store(req, res) {
    try {
      const { numero,status} = req.body;

      if (!numero || status === undefined) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
      }

      const mesaAlreadyExists = await Mesas.findOne({
        where: { numero}
      });

      if (mesaAlreadyExists) {
        return res.status(400).json({ message: "Essa mesa existe!" });
      }

      const createdMesa = await Mesas.create({ numero,status});
      return res.status(201).json(createdMesa);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao tentar adicionar a mesa!" });
    }
  }

  async index(req, res) {
    try {
      const mesa = await Mesas.findAll();
      return res.status(200).json(mesa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar os dados." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const mesa = await Mesas.findByPk(id);

      if (!mesa) {
        return res.status(404).json({ message: "Mesa não encontrado!" });
      }

      return res.status(200).json(mesa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o dado específico." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { status} = req.body;

      const mesa = await Mesas.findByPk(id);
      if (!mesa) {
        return res.status(404).json({ message: "Mesa não encontrada!" });
      }

      await Mesas.update(
        { status},
        { where: { id } }
      );
      return res.status(200).json({ message: "Mesa atualizada!" });
    }catch (error) {

      console.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const mesa = await Mesas.findByPk(id);
      if (!mesa) {
        return res.status(404).json({ message: "Mesa não encontrado!" });
      }

      await Mesas.destroy({ where: { id } });
      return res.status(200).json({ message: "Mesa deletado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar o dado." });
    }
  }
}

module.exports = new MesasControllers();