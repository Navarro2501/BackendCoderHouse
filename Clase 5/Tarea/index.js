const { json, urlencoded } = require("express");
const ejs = require('ejs');
const express = require("express");
// const { engine } = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 8080;
//const productosHandlebars = require("./routes/productosHandlebars");
//const productosPug = require('./routes/productosPug');
const productosEjs = require('./routes/productosEjs');
//const pug = require('pug');
const router = express.Router();

//Código para usar Handlebars
// app.engine(
//     "hbs", // nombre referencia a la plantilla
//     engine({ //configuración handlebars
//         extname: ".hbs", // extensión a usar
//         defaultLayout: "index.hbs",
//         layoutsDir: __dirname + "/views/layouts", // ruta a la plantilla principal
//         partialsDir: __dirname + "/views/partials/" // ruta a las plantillas parciales
//     })
// );
// app.set("view engine", "hbs"); // Establecer el motor de plantilla a utilizar
// app.set("views", "./views"); // establecemos directorio donde se encuentran los archivos de plantilla
// app.use(express.static("public")); // espacio publico del servidor
//app.use("/api/productos", productosHandlebars);


//Cóidog para usar pug
// app.set('views', './pugViews');
// app.set('view engine', 'pug');
// app.use('/api/productos', productosPug);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Código para usar ejs
app.set("view engine", "ejs");
app.use('/api/productos', productosEjs)


app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
