window.onload = function () {
    datosPersonalesBM.inicializar();
}

const datosPersonalesBM = {

    btnDPGuardar: document.getElementById('btnDPGuardar'),

    guardar: function () {
        alert("Guardando Datos Personales BM");
    },

    cargarEventos: function () {
        datosPersonalesBM.btnDPGuardar.onclick = datosPersonalesBM.guardar;
    },

    inicializar: function () {
        datosPersonalesBM.cargarEventos();
    }
};