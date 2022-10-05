const express = require('express');
const router = express.Router();
const rutaDataProductos = "utils/productos.txt";
const Controlador = require('../models/manejador');

const controlador = new Controlador(rutaDataProductos);

// 1.a) Permite listar todos los productos disponibles
router.get("/", (req, res) => {
    res.json(JSON.parse(controlador.getAll()));
})

// 1.a) Permite listar un producto por su id
router.get("/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const producto = controlador.getById(id);
    res.json(producto);
})

//1.b) Para incorporar productos al listado (disponible para admins)
router.post("/", (req, res) => {
    let { nombre, descripcion, codigo, urlFoto, precio, stock, administrador} = req.body;
    if (administrador == false || administrador == undefined) res.json({error: -1, descripcion: "Ruta / metodo POST no autorizada"})
    else if(nombre && descripcion && codigo && urlFoto && precio && stock){
        let datosProducto = {
            "timestamp": Date.now(),
            "nombre": nombre,
            "descripcion": descripcion,
            "codigo": codigo,
            "urlFoto": urlFoto,
            "precio": precio,
            "stock": stock
        };
        let nuevoProducto = controlador.save(datosProducto);
        res.send(nuevoProducto);
    } else {
        res.send("Error en la entrada de datos");
    }
})

//1.c) Actualiza un producto por su id (disponible para admins)
router.put("/:id", (req, res) => {
    let { id, nombre, descripcion, codigo, urlFoto, precio, stock, administrador} = req.body;
    if (administrador == false || administrador == undefined) res.json({error: -1, descripcion: "Ruta /:id metodo PUT no autorizada"})
    else if(id, nombre, descripcion, codigo, urlFoto, precio, stock){
        let nuevosDatosProducto = {
            "id": id,
            "timestamp": Date.now(),
            "nombre": nombre,
            "descripcion": descripcion,
            "codigo": codigo,
            "urlFoto": urlFoto,
            "precio": precio,
            "stock": stock,
        }
        let success = controlador.updateObjeto(id, nuevosDatosProducto);
        if(success == false) res.json({error: "Ocurrio un error"})
        else res.json(nuevosDatosProducto);
    }
})

//1.d) Borra un producto por su id
router.delete("/:id", (req, res) => {
    let { administrador } = req.body;
    let { id } = req.params;
    if(administrador) {
        try {
            controlador.deleteById(id);
            res.json({success: "El producto ha sido borrado"});
        } catch(e) {
            console.log(e);
        }
    } else {
        res.json({error: -1, descripcion: "Ruta /:id metodo DELETE no autorizada"})
    }
})

module.exports = router;
