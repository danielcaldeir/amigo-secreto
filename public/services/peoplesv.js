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
exports.remove = exports.update = exports.add = exports.getOne = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const eventsv = __importStar(require("../services/eventsv"));
const groupsv = __importStar(require("../services/groupsv"));
const prisma = new client_1.PrismaClient();
const getAll = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.people.findMany({ where: filters });
    }
    catch (error) {
        return false;
    }
});
exports.getAll = getAll;
const getOne = (filteres) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!filteres.id && !filteres.cpf)
            return false;
        return yield prisma.people.findFirst({ where: filteres });
    }
    catch (error) {
        return false;
    }
});
exports.getOne = getOne;
const add = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data.id_event)
            return false;
        if (!data.id_group)
            return false;
        const eventItem = yield eventsv.getOne(data.id_event);
        if (!eventItem)
            return false;
        const groupItem = yield groupsv.getOne({ id: data.id_group, id_event: data.id_event });
        if (!groupItem)
            return false;
        return yield prisma.people.create({ data });
    }
    catch (error) {
        return false;
    }
});
exports.add = add;
const update = (filteres, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.people.updateMany({ where: filteres, data });
    }
    catch (error) {
        return false;
    }
});
exports.update = update;
const remove = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.people.delete({ where: filters });
    }
    catch (error) {
        return false;
    }
});
exports.remove = remove;
//# sourceMappingURL=peoplesv.js.map