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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearch = exports.deletePeople = exports.updatePeople = exports.addPeople = exports.getPeople = exports.getAll = void 0;
const peoplesv = __importStar(require("../services/peoplesv"));
const zod_1 = require("zod");
const match_1 = require("../utils/match");
//import { type } from "os";
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event, id_group } = req.params;
    if (!id_group) {
        const items = yield peoplesv.getAll({ id_event: parseInt(id_event) });
        if (items)
            return res.json({ peoples: items });
    }
    else {
        const items = yield peoplesv.getAll({
            id_event: parseInt(id_event),
            id_group: parseInt(id_group)
        });
        if (items)
            return res.json({ peoples: items });
    }
    // const items = await peoplesv.getAll( filters );
    // if (items) return res.json({ peoples: items });
    res.json({ error: 'Ocorreu um erro' });
});
exports.getAll = getAll;
const getPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event, id_group, id, cpf } = req.params;
    if (!cpf) {
        if (!id_group) {
            const peopleItem = yield peoplesv.getOne({
                id_event: parseInt(id_event),
                id: parseInt(id)
            });
            if (peopleItem)
                return res.json({ peoples: peopleItem });
        }
        else {
            const peopleItem = yield peoplesv.getOne({
                id_event: parseInt(id_event),
                id: parseInt(id),
                id_group: parseInt(id_group)
            });
            if (peopleItem)
                return res.json({ peoples: peopleItem });
        }
    }
    else {
        const peopleItem = yield peoplesv.getOne({
            id_event: parseInt(id_event),
            cpf: cpf
        });
        if (peopleItem)
            return res.json({ peoples: peopleItem });
    }
    // const peopleItem = await peoplesv.getOne({
    //     id_event: parseInt(id_event),
    //     id: parseInt(id),
    //     id_group: parseInt(id_group)
    // });
    // if (peopleItem) return res.json({ peoples: peopleItem });
    res.json({ error: 'Ocorreu um erro' });
});
exports.getPeople = getPeople;
const addPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addPeopleSchema = zod_1.z.object({
        name: zod_1.z.string(),
        cpf: zod_1.z.string().transform(val => val.replace(/\.|-/gm, '')),
        matched: zod_1.z.string().optional()
    });
    const { id_event, id_group } = req.params;
    const body = addPeopleSchema.safeParse(req.body);
    if (!body.success)
        return res.json({ error: 'Dados Invalidos' });
    const newPeople = yield peoplesv.add(Object.assign(Object.assign({}, body.data), { id_event: parseInt(id_event), id_group: parseInt(id_group) }));
    if (newPeople)
        return res.status(201).json({ peoples: newPeople });
    res.json({ error: 'Ocorreu um Erro' });
});
exports.addPeople = addPeople;
const updatePeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePeopleSchema = zod_1.z.object({
        name: zod_1.z.string().optional(),
        cpf: zod_1.z.string().transform(val => val.replace(/\.|-/gm, '')).optional(),
        matched: zod_1.z.string().optional()
    });
    const { id_event, id_group, id } = req.params;
    const body = updatePeopleSchema.safeParse(req.body);
    if (!body.success)
        return res.json({ error: 'Dados Invalidos' });
    const updatPeople = yield peoplesv.update({
        id_event: parseInt(id_event),
        id: parseInt(id),
        id_group: parseInt(id_group)
    }, body.data);
    if (updatPeople) {
        const peopleItem = yield peoplesv.getOne({
            id_event: parseInt(id_event),
            id: parseInt(id)
        });
        if (peopleItem)
            return res.status(201).json({ peoples: peopleItem });
    }
    res.json({ error: 'Ocorreu um Erro' });
});
exports.updatePeople = updatePeople;
const deletePeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event, id_group, id } = req.params;
    const deleteItem = yield peoplesv.remove({
        id: parseInt(id),
        id_group: parseInt(id_group),
        id_event: parseInt(id_event)
    });
    if (deleteItem)
        return res.json({ peoples: deleteItem });
    res.json({ error: 'Ocorreu um erro' });
});
exports.deletePeople = deletePeople;
const getSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event, cpf } = req.params;
    const searchSchema = zod_1.z.object({
        cpf: zod_1.z.string().transform(val => val.replace(/\.|-/gm, '')).optional(),
    });
    const query = searchSchema.safeParse(req.query);
    if (!cpf) {
        if (!query.success) {
            return res.json({ error: "Dados Invalidos!" });
        }
        const peopleItem = yield peoplesv.getOne({
            id_event: parseInt(id_event),
            cpf: query.data.cpf
        });
        if (!peopleItem)
            return res.json({ error: "Nao foi encontrado o Item" });
        if (peopleItem && peopleItem.matched) {
            const matchId = (0, match_1.decryptMatch)(peopleItem.matched);
            const peopleMatched = yield peoplesv.getOne({
                id_event: parseInt(id_event),
                id: (matchId)
            });
            if (peopleMatched) {
                return res.json({
                    people: { id: peopleItem.id, name: peopleItem.name },
                    peopleMatched: { id: peopleMatched.id, name: peopleMatched.name }
                });
            }
        }
        else {
            res.json({ error: "Nao ocorreu o sorteio!" });
        }
    }
    else {
        const peopleItem = yield peoplesv.getOne({
            id_event: parseInt(id_event),
            cpf: cpf
        });
        if (!peopleItem)
            return res.json({ error: "Nao foi encontrado o Item" });
        if (peopleItem && peopleItem.matched) {
            const matchId = (0, match_1.decryptMatch)(peopleItem.matched);
            const peopleMatched = yield peoplesv.getOne({
                id_event: parseInt(id_event),
                id: matchId
            });
            if (peopleMatched) {
                return res.json({
                    people: { id: peopleItem.id, name: peopleItem.name },
                    peopleMatched: { id: peopleMatched.id, name: peopleMatched.name }
                });
            }
        }
        else {
            return res.json({ error: "Nao ocorreu o sorteio!" });
        }
    }
    return res.json({ error: "Ocorreu um error" });
});
exports.getSearch = getSearch;
//# sourceMappingURL=peoples.js.map