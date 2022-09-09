// Requerir express
const express = require("express");
// Instanciar express
const app = express();

app.get("/", (req, res) => {
    res.send("Kion dapa");
})

app.get("/fyh", (req, res) => {
    res.send({fyh: Date().toLocaleString()});
})

app.listen(3000, (req, res) => {
    console.log("Escuchando en el puerto 3000");
})