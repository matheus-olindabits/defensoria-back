const Yup = require('yup');
const Usuario = require('../models/Usuario');

class UsuarioController {

    // Faz o cadastro do usuario
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
        
        return res.json({id,nome,email});
    }

    // Faz a alteração da senha do usuário
    async alterarSenha(req,res){

        // Faz a validacao dos campos
        const schema = Yup.object().shape({
            senha_old: Yup.string().required().min(6),
            senha: Yup.string().required().min(6),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }

        const { senha_old, senha } = req.body;

        const user = await Usuario.findByPk(req.usuarioId);

        if(!(await user.verificaSenha(senha_old))){
            return res.status(401).json({ error:'Senha Atual está inválida' });
        }

        const { senha_hash } = await user.update(req.body);

        res.json(senha_hash);
    }

}

module.exports = new UsuarioController();