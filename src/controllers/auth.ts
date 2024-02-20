import { RequestHandler } from "express";
import * as authsv from "../services/authsv";
import { z } from "zod";

export const login: RequestHandler = (req, res) => {
    const loginSchema = z.object({
        password: z.string()
    });
    const body = loginSchema.safeParse(req.body);
    // Confirmar o envio do Password
    if (!body.success){
        return res.status(403).json({error: 'Dados Invalidos'});
    }
    
    // Validar a senha e gerar o token
    if (!authsv.validatePassword(body.data.password)) {
        return res.status(403).json({error: 'Acesso Negado'});
    }
    return res.json({token: authsv.createToken()});
}

export const validate: RequestHandler = (req, res, next) => {
    if (!req.headers.authorization){
        return res.status(403).json({ error: "Acesso Negado"});
    }

    const token = req.headers.authorization.split(' ');
    if (!authsv.validateToken(token[1])){
        return res.status(403).json({ error: "Acesso Negado"});
    }

    next();
}