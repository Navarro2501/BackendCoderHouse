const express = require("express");
const router = express.Router();
const Controlador = require('../models/manejador');
const rutaDataCarritos = "utils/carritos.txt"
const rutaDataProductos = "utils/productos.txt"
const controlador = new Controlador(rutaDataCarritos);
const controladorProductos = new Controlador(rutaDataProductos);

// 2.a) Crea un carrito y devuelve su id
router.post("/", (req, res) => {
    let datosCarrito = {
        "timestamp": Date.now(),
        "productos": []
    }
    try{
        controlador.save(datosCarrito);
        res.json(datosCarrito);
    } catch(error) {
        res.json({error: "An error ocurred while saving"});
    }
})

// 2.b) Vacia un carrito y lo elimina
router.delete('/:id', (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    controlador.deleteById(id);
    res.send({success: "Carrito eliminado con exito"});
})

// 2.c) Permite listar todos los productos guardados en el carrito
router.get('/:id/productos', (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let carrito = controlador.getById(id);
    res.json(carrito['productos']);
})

// 2.d) Para incorporar productos al carrito por su id de producto
router.post('/:id/productos', (req, res) => {
    let { id } = req.params;
    let { idProducto } = req.body;
    id = parseInt(id);
    let carrito = controlador.getById(id);
    let producto = controladorProductos.getById(idProducto);
    carrito['productos'].push(producto);
    controlador.updateObjeto(id, carrito);
    res.json(carrito);
})

router.delete('/:id/productos/:idProd', (req, res) => {
    let { id, idProd } = req.params;
    id = parseInt(id);
    idProd = parseInt(idProd);
    let carrito = controlador.getById(id);
    const indexMatch = (element) => element['id'] == idProd;
    let indexProducto = carrito['productos'].findIndex(indexMatch);
    carrito['productos'].splice(indexProducto, 1);
    controlador.updateObjeto(id, carrito);
    res.json(carrito);
})

module.exports = router;