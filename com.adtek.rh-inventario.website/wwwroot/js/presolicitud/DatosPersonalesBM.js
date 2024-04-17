window.onload = function () {
    datosPersonalesBM.inicializar();
}

const datosPersonalesBM = {

    btnDPGuardar: document.getElementById('btnDPGuardar'),

    guardar: function () {

        var form = document.querySelector('.formDatosPersonales')

        if (form.checkValidity()) {
            console.log("Formulario Valido");
        }

        form.classList.add('was-validated');
    },

    cargarEventos: function () {
        datosPersonalesBM.btnDPGuardar.onclick = datosPersonalesBM.guardar;
    },

    inicializar: function () {
        datosPersonalesBM.cargarEventos();
    }
};