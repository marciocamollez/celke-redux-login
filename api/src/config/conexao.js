import mongoose from 'mongoose';

class DataBase{
    constructor(){
        this.mongoDataBase();
    }
    mongoDataBase(){
        mongoose.connect('mongodb://localhost/db_api_react_celke', {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }).then(() => {
            console.log("Conexão mongodb realizada com sucesso");
        }).catch((erro) => {
            console.log("Erro de conexão: " + erro);
        });
    }
}

export default new DataBase();