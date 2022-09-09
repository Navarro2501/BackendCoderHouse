const express = require('express');
const app = express();
const rutaProductos = require("./routes/productos.js");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

app.use("/api/productos", rutaProductos);
app.get('/', (req, res) => {
    res.sendFile(__dirname, '/index.html');
})

app.listen(8080, () => {
    console.log("El servidor esta corriendo. Atrápalo!");
})