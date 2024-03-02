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
exports.doMatched = exports.remove = exports.update = exports.add = exports.getOne = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const peoplesv = __importStar(require("../services/peoplesv"));
const match_1 = require("../utils/match");
const prisma = new client_1.PrismaClient();
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.event.findMany();
    }
    catch (error) {
        return false;
    }
});
exports.getAll = getAll;
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.event.findFirst({ where: { id } });
    }
    catch (error) {
        return false;
    }
});
exports.getOne = getOne;
const add = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.event.create({ data });
    }
    catch (error) {
        return false;
    }
});
exports.add = add;
/**
 *
 * @param id number
 * @param data Object<Prisma.event>
 * @returns Object | Boolean
 */
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.event.update({ where: { id }, data });
    }
    catch (error) {
        return false;
    }
});
exports.update = update;
/**
 *
 * @param id
 * @returns Object | Boolean
 */
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.event.delete({ where: { id } });
    }
    catch (error) {
        return false;
    }
});
exports.remove = remove;
/**
 * Evento: Evento Teste 2 --> ID: 2
 * --Grupo: Grupo A --> ID: 1
 * -----Name: Daniel Caldeira
 * -----Name: Jeane Caldeira
 * -----Name: Raquel Caldeira
 * --Grupo: Grupo B --> ID: 3
 * -----Name: Andrea Oliveira
 * -----Name: Carlos Oliveira
 * --Grupo: Grupo C --> ID: 4
 * -----Name: Mariana Nogueira
 * @param id
 * @returns boolean
 */
const doMatched = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const eventItem = yield (0, exports.getOne)(id);
    if (eventItem) {
        if (eventItem.status) {
            // Todo: Fazer o sorteio
            // const result = eventsv.doMatched(id);
            // if (!result) {
            //     return res.json({ error: "Grupos impossiveis de sortear! "});
            // }
            const peopleList = yield peoplesv.getAll({ id_event: id });
            if (peopleList) {
                let sortedList = [];
                let sortable = [];
                let attempts = 0;
                let maxAttempts = peopleList.length;
                let keepTrying = true;
                while (keepTrying && attempts < maxAttempts) {
                    keepTrying = false;
                    attempts++;
                    sortedList = [];
                    sortable = peopleList.map(item => item.id);
                    for (let index in peopleList) {
                        let sortableFiltered = sortable;
                        if (eventItem.grouped) {
                            sortableFiltered = sortable.filter(sortableItem => {
                                let sortablePerson = peopleList.find(item => item.id === sortableItem);
                                return peopleList[index].id_group !== (sortablePerson === null || sortablePerson === void 0 ? void 0 : sortablePerson.id_group);
                            });
                        }
                        if ((sortableFiltered.length == 0) || (sortableFiltered.length === 1 && peopleList[index].id === sortableFiltered[0])) {
                            keepTrying = true;
                        }
                        else {
                            let sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
                            while (sortableFiltered[sortedIndex] === peopleList[index].id) {
                                sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
                            }
                            sortedList.push({
                                id: peopleList[index].id,
                                match: sortableFiltered[sortedIndex]
                            });
                            sortable = sortable.filter(item => item !== sortableFiltered[sortedIndex]);
                        }
                    }
                }
                console.log('Attempts: ' + attempts);
                console.log('MaxAttempts: ' + maxAttempts);
                console.log('sortedList: ');
                console.log(sortedList);
                if (attempts < maxAttempts) {
                    for (let index in sortedList) {
                        yield peoplesv.update({
                            id: sortedList[index].id,
                            id_event: id
                        }, { matched: (0, match_1.encryptMatch)(sortedList[index].match) });
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            // Todo: Limpar o Sorteio
            const peoples = yield peoplesv.update({ id_event: id }, { matched: '' });
            // if (peoples) return peoples;
            return false;
        }
    }
    return false;
});
exports.doMatched = doMatched;
//# sourceMappingURL=eventsv.js.map