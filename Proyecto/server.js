const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const rutaApiProductos = require('./routes/productos');
const rutaApiCarritos = require("./routes/carrito");
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/productos", rutaApiProductos);
app.use("/api/carrito", rutaApiCarritos);

app.get('*', (req, res) => {
    res.json({error: -2, descripcion: `Ruta ${req.originalUrl} metodo ${req.method} no implementada`});
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})