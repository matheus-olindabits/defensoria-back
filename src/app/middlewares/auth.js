const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { promisify } = require('util');

module.exports = async (req,res,next) =>{
    
    const token = req.headers.authorization;

    console.log(token);

    if(!token){
        return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.', redireciona:'true'})
    }

    try{

        const decoded = await promisify(jwt.verify)(token,authConfig.codigo);

        req.usuarioId = decoded.id;

        return next();

    }catch(err){
        return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.', redireciona:'true'})
    }
}