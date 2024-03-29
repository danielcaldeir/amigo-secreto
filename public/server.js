"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const site_1 = __importDefault(require("./routes/site"));
const admin_1 = __importDefault(require("./routes/admin"));
const requestIntercepter_1 = require("./utils/requestIntercepter");
// import { server } from 'typescript';
// import router from './routes/site';
const app = (0, express_1.default)();
// const port: number = (process.env.PORT) ? parseInt(process.env.PORT) : 9000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.all('*', requestIntercepter_1.requestIntercepter);
app.use('/admin', admin_1.default);
app.use('/', site_1.default);
const runServer = (port, server) => {
    server.listen(port, () => {
        console.log("Running at PORT " + port);
    });
};
const regularServer = http_1.default.createServer(app);
// Instalacao no VERCEL
const serverPort = (process.env.PORT) ? parseInt(process.env.PORT) : 9000;
// app.listen(port, () => {
//         return console.log(`Server is listening on ${port}`)
//     }
// )
// module.exports = app;
runServer(serverPort, regularServer);
// if (process.env.NODE_ENV === 'production') {
//     // TODO: configurar SSL
//     // TODO: rodar sever na 80 e na 443
//     const options = {
//         key: fs.readFileSync(process.env.SSL_KEY as string),
//         cert: fs.readFileSync(process.env.SSL_CERT as string)
//     }
//     const secServer = https.createServer(options, app);
//     runServer(80,regularServer);
//     runServer(443, secServer);
// } else {
//     const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
//     runServer(serverPort, regularServer);
// }
//# sourceMappingURL=server.js.map