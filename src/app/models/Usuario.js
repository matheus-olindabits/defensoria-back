const  { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
//const File = require('./File');

class Usuario extends Model {
    static init(sequelize){
        super.init(
        {
            nome: Sequelize.STRING,
            email : Sequelize.STRING,
            senha : Sequelize.VIRTUAL,
            senha_hash: Sequelize.STRING
        },{
            sequelize, modelName: 'FP_USUARIO', // define o nome da tabela
            freezeTableName: true, // tira o s que o sequelize acrescenta 
            timestamps: true // por padrao em datas coloca a data do momento.
        });

        this.addHook('beforeSave', async (usuario) => {
            if (usuario.senha){
                usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
            }
        });

        return this;

    }

    static associate(models){
        //this.belongsTo(File, { foreignKey: 'avatar_id' });
    }

    verificaSenha(senha){
        return bcrypt.compare(senha, this.senha_hash);
    }
}

module.exports = Usuario;