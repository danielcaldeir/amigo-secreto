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
exports.deleteEvent = exports.updateEvent = exports.addEvent = exports.getEvent = exports.getAll = void 0;
const eventsv = __importStar(require("../services/eventsv"));
const peoplesv = __importStar(require("../services/peoplesv"));
const zod_1 = require("zod");
//import { json } from "stream/consumers";
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield eventsv.getAll();
    console.log("items:" + items);
    if (items)
        return res.json({ events: items });
    res.json({ error: 'Ocorreu um erro' });
});
exports.getAll = getAll;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eventItem = yield eventsv.getOne(parseInt(id));
    if (eventItem)
        return res.json({ events: eventItem });
    res.json({ error: 'Ocorreu um erro' });
});
exports.getEvent = getEvent;
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addEventSchema = zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        grouped: zod_1.z.boolean()
    });
    const body = addEventSchema.safeParse(req.body);
    if (!body.success)
        return res.json({ error: 'Dados Invalidos' });
    const newEvent = yield eventsv.add(body.data);
    if (newEvent)
        return res.status(201).json({ events: newEvent });
    res.json({ error: 'Ocorreu um Erro' });
});
exports.addEvent = addEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const addEventSchema = zod_1.z.object({
        status: zod_1.z.boolean().optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        grouped: zod_1.z.boolean().optional()
    });
    const body = addEventSchema.safeParse(req.body);
    const updated = {
        events: {},
        peoples: {}
    };
    if (!body.success)
        return res.json({ error: 'Dados Invalidos' });
    updated.events = yield eventsv.update(parseInt(id), body.data);
    if (updated.events) {
        const eventItem = yield eventsv.getOne(parseInt(id));
        if (eventItem) {
            if (eventItem.status) {
                // Todo: Fazer o sorteio
                const result = eventsv.doMatched(parseInt(id));
                console.log(result);
                if (!result) {
                    // return res.json({ error: "Grupos impossiveis de sortear! "});
                    updated.peoples = { error: "Grupos impossiveis de sortear! " };
                }
                else {
                    updated.peoples = yield peoplesv.getAll({ id_event: parseInt(id) });
                    // const peoples = null;
                    // if (peoples) return peoples;
                    // updated.peoples = peoples;
                }
            }
            else {
                // Todo: Limpar o Sorteio
                updated.peoples = yield peoplesv.update({ id_event: parseInt(id) }, { matched: '' });
                // if (updatPeople) return res.json({ peoples: updatPeople });
            }
        }
        return res.status(201).json({ events: updated.events, peoples: updated.peoples });
    }
    res.json({ error: 'Ocorreu um Erro' });
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteItem = yield eventsv.remove(parseInt(id));
    if (deleteItem)
        return res.json({ events: deleteItem });
    res.json({ error: 'Ocorreu um erro' });
});
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=events.js.map