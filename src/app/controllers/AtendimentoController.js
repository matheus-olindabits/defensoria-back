const Yup = require('yup');
const Sequelize = require('sequelize');

const Pessoa = require('../models/Pessoa');
const Usuario = require('../models/Usuario');
const Assunto = require('../models/Assunto');

const Atendimento = require('../models/Atendimento');

class AtendimentoController {



    async CadastrarAtendimento(req, res){

        let atendimento = req.body;

        const schema = Yup.object().shape({
            titulo: Yup.string().required(),
            observacao: Yup.string().required(),
            status: Yup.string().required(),
            dataConclusao: Yup.string().required(),
            idUsuario: Yup.string().required(),
            idPessoa: Yup.string().required(),
            idAssunto: Yup.string().required(),
        });

        if(!(await schema.isValid(atendimento))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }

        await Atendimento.create(atendimento);

        return res.json('ok');
    }



    async listarAtendimentos(req,res){
        const atendimentos = await Atendimento.findAll({
            order: [
                ['id', 'DESC'],
            ],
            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                },
                {
                    model: Pessoa,
                    as: 'pessoa'
                },
                {
                    model: Assunto,
                    as: 'assunto'
                }
            ],
        });
        
        return res.json(atendimentos);
    }



}

module.exports = new AtendimentoController();