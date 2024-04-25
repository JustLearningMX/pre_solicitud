window.onload = function () {
    datosPersonalesBM.inicializar();
}

const datosPersonalesBM = {

    btnDPGuardar: document.getElementById('btnDPGuardar'),
    btnDPGuardar: document.getElementById('btnDPCancelar'),

    guardar: function () {

        var form = document.querySelector('.formDatosPersonales')

        if (form.checkValidity()) {
            console.log("Formulario Valido");
        }

        form.classList.add('was-validated');
    },

    cancelar: function () {

        var form = document.querySelector('.formDatosPersonales');
        form.classList.remove('was-validated');
        form.reset();
    },

    cargarEventos: function () {
        datosPersonalesBM.btnDPGuardar.onclick = datosPersonalesBM.guardar;
    },

    inicializar: function () {
        datosPersonalesBM.cargarEventos();
    }
};