const fs = require('fs');

class Controlador {
    constructor(ruta){
        this.ruta = ruta;
    }

    async updateObjeto(id, data){
        let objetos = JSON.parse(this.getAll());
        let getObjetoID = (objeto) => objeto["id"] == id;
        let indiceObjeto = objetos.findIndex(getObjetoID);
        if(indiceObjeto == -1) return false;
        else {
            objetos[indiceObjeto] = data;
            await fs.promises.writeFile(this.ruta, JSON.stringify(objetos));
            return true
        }
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
}

module.exports = Controlador;