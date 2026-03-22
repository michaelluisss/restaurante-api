const {clientes} = require("../models/")
class ClientesControllers{
  async store(req,res) {
    try {
           const { nome, idade,uf } = req.body;

        if (!nome || !idade || !uf ) {
           return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        const clienteAlreadyExists = await clientes.findOne({ 
            where: {  nome,idade }
        });

        if (clienteAlreadyExists) {
            return res.status(400).json({ message: "Esse cliente já existe!" });
        }

        const createdFuncionario = await clientes.create({ nome, idade,uf });
        
        return res.status(200).json(createdFuncionario);      
    } catch (error) {
        return res.status(400).json({ message: "Erro ao tentar adicionar cliente!" });
      
    }
  }

  async index(req, res) {
    try {
      const cliente= await clientes.findAll()
      return res.status(200).json(cliente)

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar os dados." });
    }
  }

  async show(req, res) {
    try {
      const {id} = req.params;
      const cliente = await clientes.findByPk(id)
      if(!cliente){
            return res.status(404).json({ message: "Cliente não encontrado!"});
        }
        return res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o dado específico." });
    }
  }

  async update(req, res) {
    try {
      const {id} = req.params;
      const {nome,idade,uf} = req.body;
      await clientes.update(
          {nome,idade,uf},
          {where:{
              id:id
          }}
      );
      return res.status(200).json({message : "Cliente atualizado!"})

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar os dados." });
    }
  }

  async destroy(req, res) {
    try {
        const {id} = req.params;
        await clientes.destroy(
            {where:{
                id:id
            }}
        );

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar o dado." });
    }
  }
}

module.exports = new ClientesControllers();