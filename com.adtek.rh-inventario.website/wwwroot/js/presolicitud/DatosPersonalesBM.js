window.addEventListener("load", function () {
    datosPersonalesBM.inicializar();
});

const datosPersonalesBM = {
    form: document.getElementById('formDatosPersonales'),
    btnDPGuardar: document.getElementById('btnDPGuardar'),
    btnDPCancelar: document.getElementById('btnDPCancelar'),

    txtDPNombre: document.getElementById('name'),
    txtDPApellidoPaterno: document.getElementById('lastName1'),
    txtDPApellidoMaterno: document.getElementById('lastName2'),
    txtDPFechaNacimiento: document.getElementById('birthday'),
    txtDPNacionalidad: document.getElementById('nacionality'),
    txtDPCurp: document.getElementById('curp'),
    txtDPIne: document.getElementById('ine'),

    alertContainer: document.querySelector('.alert'),
    spinnerContainer: document.querySelector('.spinner-container'),

    guardar: function () {

        if (datosPersonalesBM.form.checkValidity()) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const body = JSON.stringify({
                "nombre": datosPersonalesBM.txtDPNombre.value,
                "apellidoPaterno": datosPersonalesBM.txtDPApellidoPaterno.value,
                "apellidoMaterno": datosPersonalesBM.txtDPApellidoMaterno.value,
                "fechaNacimiento": datosPersonalesBM.txtDPFechaNacimiento.value,
                "nacionalidad": datosPersonalesBM.txtDPNacionalidad.value,
                "curp": datosPersonalesBM.txtDPCurp.value,
                "ine": datosPersonalesBM.txtDPIne.value
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body,
                redirect: "follow"
            };

            datosPersonalesBM.spinnerContainer.classList.add('spinner-grow');
            datosPersonalesBM.btnDPGuardar.classList.add('disabled');
            datosPersonalesBM.btnDPCancelar.classList.add('disabled');

            fetch("https://localhost:7078/api/DatosPersonales", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    alert.mostrar(datosPersonalesBM.alertContainer, datosPersonalesBM.cancelar, result);
                })
                .catch((error) => {
                    alert.mostrarError(datosPersonalesBM.alertContainer, error);
                })
                .finally(() => {
                    datosPersonalesBM.spinnerContainer.classList.remove('spinner-grow');
                    datosPersonalesBM.btnDPGuardar.classList.remove('disabled');
                    datosPersonalesBM.btnDPCancelar.classList.remove('disabled');
                });
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