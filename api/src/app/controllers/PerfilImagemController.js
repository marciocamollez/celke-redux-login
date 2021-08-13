import User from '../models/User';
import fs from 'fs';

class PerfilImagemController{
    async update(req, res){

        if(!req.file){
            return res.status(400).json({
                error: true,
                code: 129,
                message: "Selecione uma imagem válida: JPG ou PNG"
            });
        }

        const dadosImagem = {
            originalName: req.file.originalname,
            fileName: req.file.filename
        }

        await User.findOne({ _id: req.userId}, '_id fileName').then((user) => {
            //console.log(user);
            req.dadosImgUser = user.fileName;
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 128,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })

        await User.updateOne({_id: req.userId}, dadosImagem, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 129,
                message: "Erro: Imagem do perfil não editado com sucesso!"
            });
        });

        //Deleta a imagem do perfil anterior após selecionar a nova
        const imgAntiga = req.file.destination + "/" + req.dadosImgUser;

        fs.access(imgAntiga, (err) => {
            if(!err){
                fs.unlink(imgAntiga, err => {
                    //Msg Erro
                })
            }
        })

        return res.json({
            error: false,
            message: "Imagem do perfil editado com sucesso!"
        });
    }
};

export default new PerfilImagemController();