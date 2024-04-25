window.addEventListener("load", function () {
    datosRecomendacionBM.inicializar();
});

const datosRecomendacionBM = {

    form: document.getElementById('formDatosRecomendacion'),
    btnDRGuardar: document.getElementById('btnDRGuardar'),
    btnDRCancelar: document.getElementById('btnDRCancelar'),
    tipoDeCarta: document.getElementById('tipoDeCarta'),
    inputPuesto: document.getElementById('puesto'),
    inputNombre: document.getElementById('empresa'),

    guardar: function () {

        if (datosRecomendacionBM.form.checkValidity()) {
            console.log("Formulario Valido");
        }

        datosRecomendacionBM.form.classList.add('was-validated');
    },

    habilitarCamposRecomendacionLaboral: function () {
        let value = datosRecomendacionBM.tipoDeCarta.value;

        if (value === '2') {
            datosRecomendacionBM.inputPuesto.disabled = false;
            datosRecomendacionBM.inputNombre.disabled = false;
        } else {
            datosRecomendacionBM.inputPuesto.disabled = true;
            datosRecomendacionBM.inputNombre.disabled = true;
        }
    },

    cancelar: function () {

        datosRecomendacionBM.form.classList.remove('was-validated');
        datosRecomendacionBM.form.reset();
    },

    cargarEventos: function () {
        datosRecomendacionBM.btnDRGuardar.onclick = datosRecomendacionBM.guardar;
        datosRecomendacionBM.tipoDeCarta.onchange = datosRecomendacionBM.habilitarCamposRecomendacionLaboral;
        datosRecomendacionBM.btnDRCancelar.onclick = datosRecomendacionBM.cancelar;
    },

    inicializar: function () {
        datosRecomendacionBM.cargarEventos();
    }
};