const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');



const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server); // Ouvir req com protocolo http e Web Socket

io.on('connection', socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    })
});

mongoose.connect(
    "mongodb+srv://tomas:tomas@cluster0-nqwjp.mongodb.net/dropcaixa?retryWrites=true",
    {
    useNewUrlParser: true // Usando o novo tipo de url do mongo
    }
);

app.use((req, res, next)=>{
    req.io = io;

    return next(); // Processa e passa para o restante das rotas
});

app.use(express.json());
app.use(express.urlencoded({extended: true})); // Permite o envio de arquivos como fotos, documentos, etc...
app.use('/files',express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require("./routes"));

server.listen(process.env.PORT || 3333);