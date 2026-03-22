const { funcionarios } = require("../models/");
class FuncionariosControllers{
    async store(req, res) {
      try {
          const { nome, cargo , salario, idade } = req.body;

        if (!nome || !cargo || !salario || !idade) {
           return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        const funcionarioAlreadyExists = await funcionarios.findOne({ 
            where: {  nome,idade }
        });

        if (funcionarioAlreadyExists) {
            return res.status(400).json({ message: "Esse funcionario já existe!" });
        }

        const createdFuncionario = await funcionarios.create({ nome, cargo , salario, idade });
        
        return res.status(200).json(createdFuncionario); 
      } catch (error) {
        console.error(error)
        return res.status(400).json({ message: "Erro ao tentar adicionar funcionario!" });
      }
    }
    async index(req, res) {
    try {
      const funcionario = await funcionarios.findAll()
      return res.status(200).json(funcionario)

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar os dados." });
    }
  }

  async show(req, res) {
    try {
      const {id} = req.params;
      const funcionario = await funcionarios.findByPk(id)
      if(!funcionario){
            return res.status(404).json({ message: "Funcionario não encontrado!"})
        }
        return res.status(200).json(funcionario) 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o dado específico." });
    }
  }

  async update(req, res) {
   try { 
      const {id} = req.params;
      const {nome,cargo,salario,idade} = req.body;
      await funcionarios.update(
          {nome,cargo,salario,idade},
          {where:{
              id:id
          }}
      );
      return res.status(200).json({message : "Funcionario atualizado!"})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar os dados." });
    }
  }

  async destroy(req, res) {
    try {
        const {id} = req.params;
        await funcionarios.destroy(
            {where:{
                id:id
            }}
        );
        return res.status(200).json({ message: "Funcionario deletado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar o dado." });
    }
  

  };
      
}
module.exports = new FuncionariosControllers();