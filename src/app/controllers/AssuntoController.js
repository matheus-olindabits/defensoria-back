const Yup = require('yup');
const Sequelize = require('sequelize');

const Assunto = require('../models/Assunto');

class AssuntoController {



    async CadastrarAssunto(req, res){

        let assunto = req.body;

        const schema = Yup.object().shape({
            nome: Yup.string().required()
        });

        if(!(await schema.isValid(assunto))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }

        await Assunto.create(assunto);

        return res.json('ok');
    }



    async listarAssunto(req, res){
        const assuntos = await Assunto.findAll({
            order: [
                ['nome', 'ASC'],
            ]
        });
        
        return res.json(assuntos);
    }



    async alterarAssunto(req, res){

        let assunto = req.body;

        const schema = Yup.object().shape({
            nome: Yup.string().required()
        });

        if(!(await schema.isValid(assunto))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }

        const assuntoUpdate = await Assunto.findByPk(assunto.id);

        await assuntoUpdate.update(assunto);

        return res.json('ok');
    }



}

module.exports = new AssuntoController();