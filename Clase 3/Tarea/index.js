const express = require('express');
const app = express();
const Contenedor = require('./NavarroKevin.js');

app.get('/productos', (req, res) => {
    let productos = JSON.parse(Contenedor.productos.getAll());
    res.send(productos);
});

app.get("/productoRandom", (req, res) => {
    let productoRandom = Contenedor.productos.getRandom();
    res.send(productoRandom);
})

app.listen(8080, () => {
    console.log("El servidor esta corriendo. Atrápalo!");
})