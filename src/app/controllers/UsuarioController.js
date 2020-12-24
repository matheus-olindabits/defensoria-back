const Yup = require('yup');
const Usuario = require('../models/Usuario');

class UsuarioController {


    
    async cadastroUsuario(req,res){

        // Faz a validacao dos campos
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }
        
        const userExist = await Usuario.findOne({where:{ email: req.body.email }});

        if(userExist){
            return res.status(400).json({error:'Usuário já existente'});
        }

        const {id, nome, email} = await Usuario.create(req.body);
        
        return res.json('ok');
    }



    async listarUsuarios(req,res){
        const usuarios = await Usuario.findAll({
            order: [
                ['nome', 'ASC'],
            ],
            attributes: [ 'id', 'nome', 'email' ]
        });
        
        return res.json(usuarios);
    }



    async obterUsuario(req,res){
        
        const obterUsuario = await Usuario.findOne({
            where:{ id: req.params.id }, 
            attributes: [ 'id', 'nome', 'email']
        });
        
        return res.json(obterUsuario);
    }



    async alterarUsuario(req,res){
        
        let { id, nome, email } = req.body;

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }

        const usuario = await Usuario.findByPk(id);

        if(email != usuario.email){
            const emailExist = await Usuario.findOne({where:{ email: email }});

            if(emailExist){
                return res.status(400).json({error:'Email já cadastrado'});
            }  
        }

        var retorno = await usuario.update({ id: parseInt(id), nome: nome, email: email });
        
        return res.json(retorno);
    }



}

module.exports = new UsuarioController();