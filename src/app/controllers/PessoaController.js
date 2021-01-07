const Yup = require('yup');
const Sequelize = require('sequelize');
const { host, username, password, database } = require('../../config/database');

const Pessoa = require('../models/Pessoa');
const PessoaEndereco = require('../models/PessoaEndereco');

class PessoaController {



    async cadastrarPessoa(req, res) {

        // Abre a conexao do transaction
        let sequelize = new Sequelize(database, username, password, { host: host, dialect: 'mysql' });

        const t1 = await sequelize.transaction();

        try{

            let pessoa = req.body;

            // Faz a validacao dos campos
            const schema = Yup.object().shape({
                nome: Yup.string().required()
            });

            if(!(await schema.isValid(req.body))){
                return res.status(400).json({error:'Validação dos campos inválida'});
            }

            if(pessoa.cpf){
                const cpfExist = await Pessoa.findOne({where:{ cpf: pessoa.cpf }});

                if(cpfExist){
                    return res.status(400).json({error:'CPF já cadastrado'});
                }
            }

            if(pessoa.rg){
                const rgExist = await Pessoa.findOne({where:{ rg: pessoa.rg }});

                if(rgExist){
                    return res.status(400).json({error:'RG já cadastrado'});
                }
            }

            const newPessoa = await Pessoa.create({ nome: pessoa.nome, cpf: pessoa.cpf, rg: pessoa.rg, telefone: pessoa.telefone, dataNascimento: pessoa.dataNascimento }, { transaction: t1 });

            // criacao do endereco da pessoa
            if(pessoa.possuiEndereco){
                pessoa.endereco.idPessoa = newPessoa.id;
                await PessoaEndereco.create(pessoa.endereco, { transaction: t1 });
            }

            await t1.commit();

            return res.json('ok');
        }catch(error){
            await t1.rollback();
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação. Verifique sua conexão e tente novamente!'});
        }

    }



    async listarPessoas(req, res){

        const pessoas = await Pessoa.findAll({
            include: [{
                model: PessoaEndereco,
                as: 'endereco'
            }],
            order: [
                ['nome', 'ASC'],
            ]
        });
        
        return res.json(pessoas);
    }



    async obterPessoa(req,res){
        
        const obterPessoa= await Pessoa.findOne({
            where:{ id: req.params.id }, 
            include: [{
                model: PessoaEndereco,
                as: 'endereco'
            }]
        });
        
        return res.json(obterPessoa);
    }



    async alterarPessoa(req, res){
      
        let pessoa = req.body;
        console.log(pessoa);

        try{

            const schema = Yup.object().shape({
                nome: Yup.string().required()
            });

            if(!(await schema.isValid(req.body))){
                return res.status(400).json({error:'Validação dos campos inválida'});
            }

            const pessoaUpdate = await Pessoa.findByPk(pessoa.id);

            if(pessoa.cpf != pessoaUpdate.cpf){
                if(pessoa.cpf){
                    const cpfExist = await Pessoa.findOne({where:{ cpf: pessoa.cpf }});
        
                    if(cpfExist){
                        return res.status(400).json({error:'CPF já cadastrado'});
                    }
                }
            }

            if(pessoa.rg != pessoaUpdate.rg){
                if(pessoa.rg){
                    const rgExist = await Pessoa.findOne({where:{ rg: pessoa.rg }});
        
                    if(rgExist){
                        return res.status(400).json({error:'RG já cadastrado'});
                    }
                }    
            }

            await pessoaUpdate.update(pessoa);

            const pessoaEndereco = await PessoaEndereco.findOne({where:{ idPessoa: pessoa.id }});

            if(pessoa.possuiEndereco){
                if(pessoaEndereco){
                    await pessoaEndereco.update(pessoa.endereco);
                }else{
                    pessoa.endereco.idPessoa = pessoa.id;
                    await PessoaEndereco.create(pessoa.endereco);
                }
            }else{
                if(pessoaEndereco){
                    await pessoaEndereco.destroy();
                }
            }

            return res.json('ok');

        }catch(error){
            console.log(error);
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação. Verifique sua conexão e tente novamente!'});
        }
        
    }



    async alterarEnderecoPessoa(req, res){

        let pessoaEndereco = req.body;

        const enderecoUpdate = await PessoaEndereco.findOne({ where:{ id_pessoa: pessoaEndereco.idPessoa }});

        if(enderecoUpdate){
            await enderecoUpdate.update(pessoaEndereco);
        }else{
            return res.status(400).json({error:'Usuário não possui endereço'});
        }

        return res.json('ok');

    }



    async criarEnderecoPessoa(req, res){

        let pessoaEndereco = req.body;

        const enderecoUpdate = await PessoaEndereco.findOne({ where:{ id_pessoa: pessoaEndereco.idPessoa }});

        if(enderecoUpdate){
            return res.status(400).json({error:'Usuário já possui endereço'});
        }else{
            await PessoaEndereco.create(pessoaEndereco);
        }

        return res.json('ok');

    }


    
}

module.exports = new PessoaController();

