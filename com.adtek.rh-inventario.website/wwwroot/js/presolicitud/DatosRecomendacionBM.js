window.onload = function () {
    datosRecomendacionBM.inicializar();
}

const datosRecomendacionBM = {

    btnDRGuardar: document.getElementById('btnDRGuardar'),
    tipoDeCarta: document.getElementById('tipoDeCarta'),
    inputPuesto: document.getElementById('puesto'),
    inputNombre: document.getElementById('empresa'),

    guardar: function () {

        var form = document.querySelector('.formDatosPersonales');

        if (form.checkValidity()) {
            console.log("Formulario Valido");
        }

        form.classList.add('was-validated');
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

    cargarEventos: function () {
        datosRecomendacionBM.btnDRGuardar.onclick = datosRecomendacionBM.guardar;
        datosRecomendacionBM.tipoDeCarta.onchange = datosRecomendacionBM.habilitarCamposRecomendacionLaboral;
    },

    inicializar: function () {
        datosRecomendacionBM.cargarEventos();
    }
};