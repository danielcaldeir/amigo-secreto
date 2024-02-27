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
exports.deleteGroup = exports.updateGroup = exports.addGroup = exports.getGroup = exports.getAll = void 0;
const groupsv = __importStar(require("../services/groupsv"));
const zod_1 = require("zod");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event } = req.params;
    const items = yield groupsv.getAll(parseInt(id_event));
    if (items)
        return res.json({ groups: items });
    res.json({ error: 'Ocorreu um erro' });
});
exports.getAll = getAll;
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event, id_group } = req.params;
    const groupItem = yield groupsv.getOne({
        id: parseInt(id_group),
        id_event: parseInt(id_event)
    });
    if (groupItem)
        return res.json({ groups: groupItem });
    res.json({ error: 'Ocorreu um erro' });
});
exports.getGroup = getGroup;
const addGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addGroupSchema = zod_1.z.object({
        name: zod_1.z.string()
    });
    const { id_event } = req.params;
    const body = addGroupSchema.safeParse(req.body);
    if (!body.success)
        return res.json({ error: 'Dados Invalidos' });
    const newGroup = yield groupsv.add(Object.assign(Object.assign({}, body.data), { id_event: parseInt(id_event) }));
    if (newGroup)
        return res.status(201).json({ groups: newGroup });
    res.json({ error: 'Ocorreu um Erro' });
});
exports.addGroup = addGroup;
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateGroupSchema = zod_1.z.object({
        name: zod_1.z.string().optional()
    });
    const { id_event, id_group } = req.params;
    const body = updateGroupSchema.safeParse(req.body);
    if (!body.success)
        return res.json({ error: 'Dados Invalidos' });
    const updatGroup = yield groupsv.update({
        id: parseInt(id_group),
        id_event: parseInt(id_event)
    }, body.data);
    if (updatGroup) {
        return res.status(201).json({ groups: updatGroup });
    }
    res.json({ error: 'Ocorreu um Erro' });
});
exports.updateGroup = updateGroup;
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event, id_group } = req.params;
    const deleteItem = yield groupsv.remove({
        id: parseInt(id_group),
        id_event: parseInt(id_event)
    });
    if (deleteItem)
        return res.json({ groups: deleteItem });
    res.json({ error: 'Ocorreu um erro' });
});
exports.deleteGroup = deleteGroup;
