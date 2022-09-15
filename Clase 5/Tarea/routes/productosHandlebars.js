const fs = require('fs');
const { Router } = require('express');
const e = require('express');
const { type } = require('os');
const router = Router();

var productos = () => [
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg",
        id: 1
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://www.officedepot.com.mx/medias/79530.gif-1200ftw?context=bWFzdGVyfHJvb3R8MjQxNDYyfGltYWdlL2dpZnxoZDIvaDk4Lzk0MDI3NjE2NDIwMTQuZ2lmfGRmZmNkM2ZhNjkzNmViN2RkMGYxNWMzODZmNjA2ZWQwNDgzMTE5YTQ0MjRmNGM5NjIxOTM4MTMzNzExNDdmYWQ",
        id: 2
    },
    {
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://m.media-amazon.com/images/I/91JEXV3kk1L._AC_SL1500_.jpg",
        id: 3
    }
]

var currentID = 3;

router.get('/productos', (req, res) => {
    res.render("main", { productos: productos(), listExists: true});
});

// router.get("/:id", (req, res) => {
//     // Devuelve un producto según su ID
//     let id = Number.parseInt(req.params.id);
//     let objetoID = productos.find(elemento => elemento['id'] == id);
//     objetoID == undefined ? res.send("Objeto no encontrado") : res.json(objetoID)
// });

router.get("/", (req, res) => {
    res.render("formulario");
})

router.post("/", (req, res) => {
    // Recibe y agrega un producto, y lo devuelve con un ID asignado
    let { title, price, thumbnail } = req.body;
    if(title != undefined && price != undefined && thumbnail != undefined) {
        price = Number.parseInt(price);
        if(typeof(price) != "number") res.send({ "error": "El precio debe ser un número." })
        
        let nuevoProducto = {"title": title, "price": price, "thumbnail": thumbnail, "id": currentID + 1 };
        try {
            let currentProducts = productos();
            currentProducts.push(nuevoProducto);
            productos = () => currentProducts;
            currentID += 1;
            res.redirect("/api/productos/productos");
            res.send()
        } catch(err){
            res.send("Error de escritura");
        }
    }
    else {
        res.send("Por favor enviar datos completos");
    }
})

router.put("/:id", (req, res) => {
    // Recibe y actualiza un producto según su ID
    let id = Number.parseInt(req.params.id);
    let { title, price, thumbnail } = req.body;
    if(title != undefined && price != undefined && thumbnail != undefined) {
        price = Number.parseInt(price);
        if(typeof(price) != "number") res.send({ "error": "El precio debe ser un número." })
        let getProductoID = (producto) => producto["id"] == id
        let indiceProducto = productos.findIndex(getProductoID);
        if(indiceProducto == -1) res.send("Producto no encontrado");
        else {
            productos[indiceProducto] = {
                "title": title,
                "price": price,
                "thumbnail": thumbnail,
                "id": id
            }
        }
        res.json(productos[indiceProducto]);
        res.send();
    } else {
        res.send("Verificar datos");
    }
})

router.delete("/:id", (req, res) => {
    // Borra un producto con su ID
    let id = Number.parseInt(req.params.id);
    let getProductoID = (producto) => producto["id"] == id
    let indiceProducto = productos.findIndex(getProductoID);
    if(indiceProducto == -1) res.send("Producto no encontrado");
    else productos.splice(indiceProducto, 1);
    res.json({"err": "Producto no encontrado"});
    res.send("El producto ha sido eliminado");
})

module.exports = router;