import jwt from 'jsonwebtoken';
import { config } from 'process';
import {promisify} from 'util';
import configAuth from '../../config/auth';

export default async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token não encontrado"
        });
    }

    const [bearer, token] = authHeader.split(' ');

    try{
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);

        req.userId = decoded.id;

        return next();

    }catch(err){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token inválido"
        });
    }
      
}