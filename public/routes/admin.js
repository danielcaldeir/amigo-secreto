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
exports.adminRoutes = void 0;
const express_1 = require("express");
const auth = __importStar(require("../controllers/auth"));
const event = __importStar(require("../controllers/events"));
const group = __importStar(require("../controllers/groups"));
const people = __importStar(require("../controllers/peoples"));
const router = (0, express_1.Router)();
router.post('/login', auth.login);
router.get('/ping', auth.validate, (req, res) => { res.json({ pong: true, admin: true }); });
router.get('/events', auth.validate, event.getAll);
router.get('/events/:id', auth.validate, event.getEvent);
router.post('/events', auth.validate, event.addEvent);
router.put('/events/:id', auth.validate, event.updateEvent);
router.delete('/events/:id', auth.validate, event.deleteEvent);
router.get('/groups/:id_event', auth.validate, group.getAll);
router.get('/groups/:id_event/:id_group', auth.validate, group.getGroup);
router.post('/groups/:id_event', auth.validate, group.addGroup);
router.put('/groups/:id_event/:id_group', auth.validate, group.updateGroup);
router.delete('/groups/:id_event/:id_group', auth.validate, group.deleteGroup);
router.get('/peoples/group/:id_event/:id_group', auth.validate, people.getAll);
router.get('/peoples/event/:id_event', auth.validate, people.getAll);
router.get('/peoples/:id_event/:id_group/:id', auth.validate, people.getPeople);
router.get('/peoples/id/:id_event/:id', auth.validate, people.getPeople);
router.get('/peoples/cpf/:id_event/:cpf', auth.validate, people.getPeople);
router.post('/peoples/:id_event/:id_group', auth.validate, people.addPeople);
router.put('/peoples/:id_event/:id_group/:id', auth.validate, people.updatePeople);
router.delete('/peoples/:id_event/:id_group/:id', auth.validate, people.deletePeople);
exports.default = router;
exports.adminRoutes = router;
//# sourceMappingURL=admin.js.map