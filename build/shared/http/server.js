"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const AppErros_1 = __importDefault(require("../erros/AppErros"));
require("@shared/typeorm");
const celebrate_1 = require("celebrate");
const path_1 = __importDefault(require("path"));
require("./websocket");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const serverHttp = http_1.default.createServer(app);
const io = new socket_io_1.Server(serverHttp);
var idCorrespodente;
const mensagens = [];
var dadosDeQuemEntrouEmContato = [];
// rotas estaticas , serve para acessar arquivos estaticos passando o /file com o nome do arquivo
app.use(express_1.default.static(path_1.default.resolve(__dirname, '..', '..', '..', 'uploads')));
app.use(routes_1.default);
app.use((0, celebrate_1.errors)());
// isso é um middleware
app.use((err, req, res, next) => {
    if (err instanceof AppErros_1.default) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Erro no servidor interno'
    });
});
function mandarMenssagem(temMsg) {
    if (temMsg) {
    }
}
io.on('connection', (cliente) => {
    cliente.on('mensagens', (msg) => {
        idCorrespodente = msg.idCorrespodente;
        let objMsg = {
            id: msg.id,
            mensagem: msg.mensagem
        };
        // console.log(objMsg);
        mensagens.push(objMsg);
        console.log(mensagens);
        let obj = {
            id: msg.dadosDeQuemMandaMensagem.id,
            mensagens,
            avatar: msg.dadosDeQuemMandaMensagem.avatar,
            novaMsg: mensagens[mensagens.length - 1].id == msg.id ? true : false,
        };
        dadosDeQuemEntrouEmContato = obj;
        // io.to(msg.idCorrespodente).emit('mensagem', { dadosDeQuemEntrouEmContato, paraCorrespondente: 'ok' });
    });
    cliente.on('join', function (data) {
        cliente.join(data.id);
        console.log(data.id);
        io.to(idCorrespodente).emit('mensagem', { dadosDeQuemEntrouEmContato, paraCorrespondente: 'ok' });
        // if (dadosDeQuemEntrouEmContato) cliente.emit("previousMensages", dadosDeQuemEntrouEmContato);
        // cliente.on('mensagens', (msg: any) => {
        //   let objMsg = {
        //     id: msg.id,
        //     mensagem: msg.mensagem
        //   }
        //   console.log(objMsg);
        //   mensagens.push(objMsg);
        //   // console.log(mensagens);
        //   let obj = {
        //     id: msg.dadosDeQuemMandaMensagem.id,
        //     mensagens,
        //     avatar: msg.dadosDeQuemMandaMensagem.avatar,
        //     novaMsg: mensagens[mensagens.length - 1].id == msg.id ? true : false,
        //   }
        //   dadosDeQuemEntrouEmContato = obj;
        // io.to(msg.idCorrespodente).emit('mensagem', { dadosDeQuemEntrouEmContato, paraCorrespondente: 'ok' });
        //   // io.to(msg.id).emit('mensagem', { dadosDeQuemEntrouEmContato, paraMInMesmo: 'ok' });
        //   // cliente.emit('mensagem', dadosDeQuemEntrouEmContato);
        // })
    });
});
io.on('disconected', (socket) => {
    console.log('cliente desconectado');
    // desconectar cliente
    socket.disconnect(true);
});
serverHttp.listen(3333, () => {
    console.log("websocket na porta 3333");
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}! 🏆`);
});
