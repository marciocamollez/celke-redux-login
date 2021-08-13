import User from '../models/User';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

class UserController{


    async index(req, res){
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;

        await User.paginate({}, {select: '_id name email', page, limit, sort: 'createdAt'}).then((users) => {
            return res.json({
                error: false,
                users: users
            })
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação"
            });
        })
    }

    async show(req, res) {
        User.findOne({ _id: req.params.id }, '_id name email createdAt updatedAt originalName fileName').then((user) => {
            console.log(user)
            return res.json({
                error: false,
                user: user
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };


    async store(req, res){

        //Verificações se o campo está em branco
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Erro: Dados Inválidos"
            });
        }



        //Verificar se o email está cadastrado anteriormente
        const emailExiste = await User.findOne({email: req.body.email});

        if(emailExiste){
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Email já cadastrado"
            });
        }       


        //Criptografa a senha
        var dados = req.body;
        dados.password = await bcrypt.hash(dados.password, 7);


        //Faz a inserção do usuário no Banco
        const user = await User.create(dados, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Erro: Usuário não cadastrado"
            });

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso",
                dados: user
            })    
        });

    };

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
            name: Yup.string(),
            email: Yup.string()
                .email(),
            password: Yup.string()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { _id, email }= req.body;

        const usuarioExiste = await User.findOne({_id: _id});

        if(!usuarioExiste){
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Usuário não encontrado!"
            });
        };

        if(email != usuarioExiste.email){
            const emailExiste = await User.findOne({email});
            if(emailExiste){
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Erro: Este e-mail já está cadastrado!"
                });
            };
        };

        var dados = req.body;
        if(dados.password){
            dados.password = await bcrypt.hash(dados.password, 8);
        };

        await User.updateOne({_id: dados._id}, dados, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Usuário não foi editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        });        
    };


    async delete(req, res) {

        const usuarioExiste = await User.findOne({ _id: req.params.id});

        if(!usuarioExiste){
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Erro: Usuário não encontrado"
            })
        }

        const user = await User.deleteOne({_id: req.params.id}, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: Usuário não foi apagado com sucesso!"
            })
        });
        
        return res.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        })
    }
}

export default new UserController();