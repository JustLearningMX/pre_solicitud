window.addEventListener("load", function () {
    datosPersonalesBM.inicializar();
});

const datosPersonalesBM = {
    form: document.getElementById('formDatosPersonales'),
    btnDPGuardar: document.getElementById('btnDPGuardar'),
    btnDPCancelar: document.getElementById('btnDPCancelar'),

    guardar: function () {

        if (datosPersonalesBM.form.checkValidity()) {
            console.log("Formulario Valido");
        }

        datosPersonalesBM.form.classList.add('was-validated');
    },

    cancelar: function () {
       
        datosPersonalesBM.form.classList.remove('was-validated');
        datosPersonalesBM.form.reset();
    },

    cargarEventos: function () {
        datosPersonalesBM.btnDPGuardar.onclick = datosPersonalesBM.guardar;
        datosPersonalesBM.btnDPCancelar.onclick = datosPersonalesBM.cancelar;
    },

    inicializar: function () {
        datosPersonalesBM.cargarEventos();
    }
};