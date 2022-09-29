const express = require("express"); // Servidor normal
const http = require("http"); // Servidor para websocket
const { Server: SocketServer } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
})

socketServer.on("connection", (client) => {
    console.log("Usuario conectado");
    console.log(client.id);
    client.on('disconnect', () => {
        console.log("Se desconectó");
    })
    client.on('mensaje', mensaje => {
        console.log(mensaje);
        socketServer.emit("respuesta", "Mensaje recibido");
    })
})

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " + PORT);
})