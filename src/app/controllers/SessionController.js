const Yup = require('yup');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const AuthConfig = require('../../config/auth');

class SessionController{

    async login(req,res){

        // Faz a validacao dos campos
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Validação dos campos inválida'});
        }

        const { email, senha } = req.body;

        const user = await Usuario.findOne({ where:{ email } });

        if(!user){
            return res.status(401).json({error: 'Usuário e/ou senha inválidos!'});
        }

        if(!(await user.verificaSenha(senha))){
            return res.status(401).json({error: 'Usuário e/ou senha inválidos.' });
        }

        const { id,nome } = user;

        return res.json({
            id,nome,email,
            token: jwt.sign({ id }, AuthConfig.codigo, { expiresIn: AuthConfig.expiresIn })
        });
    }

} 

module.exports = new SessionController();