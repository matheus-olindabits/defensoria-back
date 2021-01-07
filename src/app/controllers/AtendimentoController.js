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
            dataConclusao: Yup.string().required(),
            idPessoa: Yup.string().required(),
            idAssunto: Yup.string().required(),
            idUsuario: Yup.string().required()
        });

        if(!(await schema.isValid(atendimento))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }

        atendimento.status = 0;

        await Atendimento.create(atendimento);

        return res.json('ok');
    }



    async listarAtendimentosEmAberto(req,res){

        let  dataAtual = new Date().toLocaleString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'}, {
            timeZone: 'America/Sao_Paulo'
        });
        
        //dataAtual = dataAtual.substring(0,4) + '-' + dataAtual.substring(5,7) + '-' + dataAtual.substring(8,10);

        console.log(dataAtual)

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



    async obterAtendimento(req,res){

        let  dataAtual = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        });
        
        dataAtual = dataAtual.substring(0,4) + '-' + dataAtual.substring(5,7) + '-' + dataAtual.substring(8,10);
        
        const obterAtendimento = await Atendimento.findOne({
            where:{ id: req.params.id }
        });

        if(!obterAtendimento){
            return res.status(400).json({error:'Não foi possível buscar o atendimento'});
        }

        obterAtendimento.dataAtual = dataAtual;
        
        return res.json(obterAtendimento);
    }



    async alterarAtendimento(req, res){

        let atendimento = req.body;

        const schema = Yup.object().shape({
            titulo: Yup.string().required(),
            dataConclusao: Yup.string().required(),
            idPessoa: Yup.string().required(),
            idAssunto: Yup.string().required(),
            idUsuario: Yup.string().required()
        });

        if(!(await schema.isValid(atendimento))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }

        const atendimentoUpdate = await Atendimento.findByPk(atendimento.id);

        if(!atendimentoUpdate){
            return res.status(400).json({error:'Não foi possível buscar o atendimento'});
        }

        await atendimentoUpdate.update(atendimento);

        return res.json('ok');

    }



    async alterarStatus(req, res){

        let idAtendimento = req.params.idAtendimento;
        let status = req.params.status; 

        const atendimentoUpdate = await Atendimento.findByPk(idAtendimento);

        if(!atendimentoUpdate){
            return res.status(400).json({error:'Não foi possível buscar o atendimento'});
        }

        await atendimentoUpdate.update({ status: Number(status) });

        return res.json('ok');

    }


    async historicoAtendimentoPessoa(req,res){

        const idPessoa = req.params.id;

        let  dataAtual = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        });
        
        dataAtual = dataAtual.substring(0,4) + '-' + dataAtual.substring(5,7) + '-' + dataAtual.substring(8,10);

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
        
        return res.json({ atendimentos: atendimentos, dataAtual: dataAtual });
    }



}

module.exports = new AtendimentoController();