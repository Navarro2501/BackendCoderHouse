// function callback(parametro) {
//     console.log(`El usuario escribio un ${parametro}`);
// }

// function principal(frase, cb){
//     let respuesta = cb(frase);
//     return respuesta;
// }

// console.log(principal('mucho gusto', callback));

// Promesas
usuarios = []
function agregarFamiliarPromesas(user, infoFamiliar) {
    usuarios.findById(user.id)
    .then(
        usuario => familiares.findAllByLastName(usuario.lastName)
        .then(
            familiares => {
                if(familiares.include(infoFamiliar)) {
                    return "Este usuario ya existe";
                } else {
                    return familiares.createOne(infoFamiliar);
                }
            }
        ).then(() => "Familiar creado con exito")
        .catch( error => error)
    )
}

