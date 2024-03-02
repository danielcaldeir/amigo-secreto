"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.login = void 0;
const authsv = __importStar(require("../services/authsv"));
const zod_1 = require("zod");
const login = (req, res) => {
    const loginSchema = zod_1.z.object({
        password: zod_1.z.string()
    });
    const body = loginSchema.safeParse(req.body);
    // Confirmar o envio do Password
    if (!body.success) {
        return res.status(403).json({ error: 'Dados Invalidos' });
    }
    // Validar a senha e gerar o token
    if (!authsv.validatePassword(body.data.password)) {
        return res.status(403).json({ error: 'Acesso Negado' });
    }
    return res.json({ token: authsv.createToken() });
};
exports.login = login;
const validate = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: "Acesso Negado" });
    }
    const token = req.headers.authorization.split(' ');
    if (!authsv.validateToken(token[1])) {
        return res.status(403).json({ error: "Acesso Negado" });
    }
    next();
};
exports.validate = validate;
//# sourceMappingURL=auth.js.map