const Yup = require('yup');
const Pessoa = require('../models/Pessoa');

class PessoaController {

    async listarPessoas(req,res){
        const pessoas = await Pessoa.findAll({
            order: [
                ['nome', 'ASC'],
            ],
            attributes: [ 'id', 'nome' ]
        });
        
        return res.json(pessoas);
    }

}

module.exports = new PessoaController();

