window.addEventListener("load", function () {
    datosRecomendacionBM.inicializar();
});

const datosRecomendacionBM = {

    form: document.getElementById('formDatosRecomendacion'),
    btnDRGuardar: document.getElementById('btnDRGuardar'),
    btnDRCancelar: document.getElementById('btnDRCancelar'),

    txtPersona: document.getElementById('persona'),
    txtTelefono: document.getElementById('telContacto'),
    txtTipoDeCarta: document.getElementById('tipoDeCarta'),
    txtPuesto: document.getElementById('puesto'),
    txtEmpresa: document.getElementById('empresa'),

    guardar: function () {

        if (datosRecomendacionBM.form.checkValidity()) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const body = JSON.stringify({
                "nombreRecomendador": datosRecomendacionBM.txtPersona.value,
                "telefono": datosRecomendacionBM.txtTelefono.value,
                "tipoCarta": datosRecomendacionBM.txtTipoDeCarta.value,
                "puesto": datosRecomendacionBM.txtTipoDeCarta.value === "2" ? datosRecomendacionBM.txtPuesto.value : "empty",
                "empresa": datosRecomendacionBM.txtTipoDeCarta.value === "2" ? datosRecomendacionBM.txtEmpresa.value : "empty",
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body,
                redirect: "follow"
            };

            fetch("https://localhost:7078/api/DatosRecomendacion", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    datosRecomendacionBM.cancelar();
                })
                .catch((error) => console.error(error));
        }

        datosRecomendacionBM.form.classList.add('was-validated');

    },

    habilitarCamposRecomendacionLaboral: function () {
        let value = datosRecomendacionBM.txtTipoDeCarta.value;

        if (value === '2') {
            datosRecomendacionBM.txtPuesto.disabled = false;
            datosRecomendacionBM.txtEmpresa.disabled = false;
        } else {
            datosRecomendacionBM.txtPuesto.disabled = true;
            datosRecomendacionBM.txtEmpresa.disabled = true;
        }
    },

    cancelar: function () {

        datosRecomendacionBM.form.classList.remove('was-validated');
        datosRecomendacionBM.form.reset();
    },

    cargarEventos: function () {
        datosRecomendacionBM.btnDRGuardar.onclick = datosRecomendacionBM.guardar;
        datosRecomendacionBM.txtTipoDeCarta.onchange = datosRecomendacionBM.habilitarCamposRecomendacionLaboral;
        datosRecomendacionBM.btnDRCancelar.onclick = datosRecomendacionBM.cancelar;
    },

    inicializar: function () {
        datosRecomendacionBM.cargarEventos();
    }
};