const Yup = require('yup');
const Sequelize = require('sequelize');
const {host, username, password, database} = require('../../config/database');

const Pessoa = require('../models/Pessoa');
const PessoaEndereco = require('../models/PessoaEndereco');

class PessoaController {



    async cadastrarPessoa(req,res) {

        // Abre a conexao do transaction
        let sequelize = new Sequelize(database, username, password, { host: host, dialect: 'mysql' });

        const t1 = await sequelize.transaction();

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

        const newPessoa = await Pessoa.create(pessoa, { transaction: t1 });

        // criacao do endereco da pessoa
        if(pessoa.endereco){
            pessoa.endereco.idPessoa = newPessoa.id;
            await PessoaEndereco.create(pessoa.endereco, { transaction: t1 });
        }

        await t1.commit();

        return res.json('ok');

    }



    async listarPessoas(req,res){

        // let sequelize = new Sequelize(database, username, password, { host: host, dialect: 'mysql' });

        // await sequelize.query(
        //     `SELECT PES.nome, PES.cpf, PES.rg, PES.telefone, PES.data_nascimento, EDR.cep, EDR.logradouro, EDR.bairro, EDR.cidade, EDR.uf, EDR.numero, EDR.complemento, EDR.id_pessoa 
        //     from PESSOA PES 
        //     left join ENDERECO_PESSOA EDR ON PES.id = EDR.id_pessoa
        //     order by PES.nome asc`, 
        //     { type:Sequelize.QueryTypes.SELECT})
        // .then(function(properties) {
        //     //res.json(properties[0])
        //     console.log(properties);
        // });

        const pessoas = await Pessoa.findAll({
            include: [{
                model: PessoaEndereco,
                as: 'endereco'
            }],
            order: [
                ['nome', 'ASC'],
            ]
        });



        //let enderecoPessoa = pessoas.endereco[];
        //const {nome, cpf, rg, telefone, dataNascimento} = pessoas;
        //let pessoaLits = {id: pessoas.id, nome: pessoas.nome, cpf: pessoas.cpf, rg: pessoas.rg, telefone: pessoas.telefone, dataNascimento: pessoas.dataNascimento, endereco: enderecoPessoa}
        
        return res.json(pessoas);
    }

}

module.exports = new PessoaController();

