const fs = require('fs');


class Contenedor {
    constructor(ruta){
        this.ruta = ruta;
    }

    async save(objeto){
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        let objetosExistentes = JSON.parse(this.getAll());
        objeto['id'] = objetosExistentes.length + 1
        objetosExistentes.push(objeto);
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(objetosExistentes));
        } catch(err) {
            console.log(err);
        }
    }

    getById(numero){
        let objetos = JSON.parse(this.getAll());
        let objetoID = objetos.find(elemento => elemento['id'] == numero);
        if(objetoID == undefined) { console.log("Objeto no encontrado") }
        else { return objetoID }
    }

    getAll(){
        // Devuelve un Array con los objetos presentes en el archivo
        let fileData = fs.readFileSync(this.ruta, 'utf-8');
        if(fileData == undefined){
            console.log("Hubo un error. Verifique la ruta");
            return [];
        } else {
            return [fileData];
        }
    }

    getRandom(){
        let objetos = JSON.parse(this.getAll());
        let randomNumber = Math.floor(Math.random() * (objetos.length))
        return objetos[randomNumber];
    }

    async deleteById(numero){
        // Elimina del archivo el objeto con el id buscado
        let objeto = this.getById(numero);
        if(objeto != undefined){
            let objetosExistentes = JSON.parse(this.getAll())
            const indexMatch = (element) => element['id'] == numero;
            let objectIndex = objetosExistentes.findIndex(indexMatch);
            objetosExistentes.splice(objectIndex, 1);
            try {
                await fs.promises.writeFile(this.ruta, JSON.stringify(objetosExistentes));
            } catch(err) {
                console.log(err);
            }
        }
    }

    deleteAll(){
        // Elimina todos los objetos presentes en el archivo
        fs.promises.writeFile(this.ruta, "[]");
    }

}

module.exports.productos = new Contenedor('productos.txt');