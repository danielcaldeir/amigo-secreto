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
const express_1 = __importStar(require("express"));
const requestIntercepter_1 = require("./utils/requestIntercepter");
const event = __importStar(require("./controllers/events"));
const people = __importStar(require("./controllers/peoples"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const router = (0, express_1.Router)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.all('*', requestIntercepter_1.requestIntercepter);
// app.use('/', siteRoutes);
// app.use('/admin', adminRoutes);
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', (req, res) => { res.json({ pong: true }); });
app.get('/events/:id', event.getEvent);
app.get('/events/search/:id_event/:cpf', people.getSearch);
app.get('/events/search/:id_event', people.getSearch);
// app.get('/ping', (_req: Request, res: Response) => {
//   return res.send('pong 🏓')
// })
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map