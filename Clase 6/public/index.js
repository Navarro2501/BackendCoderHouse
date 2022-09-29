const socketClient = io()

const formulario = document.getElementById('formulario');
const inputInfo = document.getElementById('info');

formulario.onsubmit = e => {
    e.preventDefault();
    const info = inputInfo.value;
    if(info) {
        socketClient.emit('mensaje', info);
    }
}

socketClient.on("respuesta", respuesta => {
    alert(respuesta);
})