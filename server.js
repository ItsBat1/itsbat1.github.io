const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serveix els fitxers HTML estàtics
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Un usuari s\'ha connectat');

    // Escolta els missatges enviats pel client
    socket.on('chat message', (msg) => {
        console.log(`Missatge rebut: ${msg}`); // Registra el missatge al servidor
        io.emit('chat message', msg); // envia el missatge a tots els usuaris connectats
    });

    socket.on('disconnect', () => {
        console.log('Un usuari s\'ha desconnectat');
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Servidor actiu a http://IP_DEL_SERVIDOR:3000');
});
