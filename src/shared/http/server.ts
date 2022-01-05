import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from 'cors';
import routes from './routes';
import AppError from '../erros/AppErros';
import "@shared/typeorm";
import { errors } from "celebrate";
import path from 'path';
import "./websocket";
import { Server, Socket } from 'socket.io';
import http from 'http';

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));


const serverHttp = http.createServer(app);
const io = new Server(serverHttp);
var idCorrespodente: any;
const mensagens: any = [];
var dadosDeQuemEntrouEmContato: any = [];



// rotas estaticas , serve para acessar arquivos estaticos passando o /file com o nome do arquivo

app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'uploads')));
app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'semFoto')));
app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'upteste')));
app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'imagensDosFeeds')));

app.use(routes);

app.use(errors());


// isso é um middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AppError) {

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

function mandarMenssagem(temMsg: any) {
  if (temMsg) {

  }
}
io.on('connection', (cliente) => {


  cliente.on('join', function (data) {
    cliente.join(data.id);

    // console.log(data)

    // io.to(data.idCorrespodente).emit('mensagem', { dadosDeQuemEntrouEmContato, paraCorrespondente: 'ok' });


    if (dadosDeQuemEntrouEmContato) cliente.emit("previousMensages", dadosDeQuemEntrouEmContato);


    cliente.on('mensagens', (msg: any) => {

      let objMsg = {
        id: msg.id,
        mensagem: msg.mensagem
      }

      console.log(objMsg);

      mensagens.push(objMsg);

      // console.log(mensagens);

      let obj = {

        id: msg.dadosDeQuemMandaMensagem.id,
        mensagens,
        avatar: msg.dadosDeQuemMandaMensagem.avatar,
        novaMsg: mensagens[mensagens.length - 1].id == msg.id ? true : false,
      }
      dadosDeQuemEntrouEmContato = obj;

      io.to(msg.idCorrespodente).emit('mensagem', { dadosDeQuemEntrouEmContato, paraCorrespondente: 'ok' });
      io.to(msg.id).emit('mensagem', { dadosDeQuemEntrouEmContato, paraCorrespondente: 'ok' });
      // io.to(msg.id).emit('mensagem', { dadosDeQuemEntrouEmContato, paraMInMesmo: 'ok' });
      // cliente.emit('mensagem', dadosDeQuemEntrouEmContato);

    })
  });

});


io.on('disconected', (socket: Socket) => {
  console.log('cliente desconectado')

  // desconectar cliente
  socket.disconnect(true);

})

serverHttp.listen(3333, () => {
  console.log("websocket na porta 3333");
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}! 🏆`);
});
