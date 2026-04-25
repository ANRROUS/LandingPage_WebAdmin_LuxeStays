import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js';

export const authRequired = (req,res,next) =>{
    const {token} = req.cookies;
    if(!token) return res.status(400).json({message:"NO HAY AUTORIZACION DE TOKEN: PERMISO DENEGADO"});

    jwt.verify(token,TOKEN_SECRET,(err,user) => {
        if(err) return res.status(403).json({message:"TOKEN INVALIDO"});
        req.user=user;
        next();
    });    
}