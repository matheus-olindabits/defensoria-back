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



    async listarAtendimentosEmAberto(req,res){

        let  dataAtual = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        });
        
        dataAtual = dataAtual.substring(0,4) + '-' + dataAtual.substring(5,7) + '-' + dataAtual.substring(8,10);

        let atendimentos = await Atendimento.findAll({
            where:{
                'status': 0
            },
            attributes: [
                'id', 'titulo', 'observacao', 'status', ['data_conclusao', 'dataConclusao'], 
                ['id_usuario', 'idUsuario'], ['id_pessoa', 'idPessoa'], ['id_assunto', 'idAssunto'], 
                Sequelize.literal(`'${dataAtual}' as dataAtual`)
            ],
            order: [
                ['dataConclusao', 'DESC'],
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



    async historicoAtendimentoPessoa(req,res){

        const idPessoa = req.params.id;

        const atendimentos = await Atendimento.findAll({
            order: [
                ['status', 'ASC'],
                ['id', 'DESC'],
            ],
            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                },
                {
                    model: Pessoa,
                    as: 'pessoa',
                    where: {
                        id: idPessoa
                      }
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