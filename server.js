// Instal·la les dependències: express i socket.io
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serveix els fitxers HTML estàtics
app.use(express.static(__dirname + '/public'));

// Quan un usuari es connecta
io.on('connection', (socket) => {
    console.log('Un usuari s\'ha connectat');

    // Escolta els missatges enviats pels usuaris
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // envia el missatge a tots els usuaris
    });

    // Quan un usuari es desconnecta
    socket.on('disconnect', () => {
        console.log('Un usuari s\'ha desconnectat');
    });
});

// Escolta en el port 3000 de la IP pública
server.listen(3000, '0.0.0.0', () => {
    console.log('Servidor actiu a http://IP_DEL_SERVIDOR:3000');
});
