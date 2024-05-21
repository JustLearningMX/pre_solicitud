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
    alertBtnClose: document.querySelector('#alert-close'),
    alertTitle: document.querySelector('.alert-title'),
    alertDetalle: document.querySelector('.alert-detalle'),
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
                    debugger
                    console.log(result);
                    datosPersonalesBM.alertContainer.classList.remove('alert-success', 'alert-warning', 'alert-danger');
                    datosPersonalesBM.spinnerContainer.classList.remove('spinner-grow');

                    if (Number(result.codigo) >= 200 && Number(result.codigo) <= 299) {
                        // OK
                        datosPersonalesBM.alertContainer.classList.add('alert-success');
                        datosPersonalesBM.alertTitle.textContent = "Informacion guardada";
                        datosPersonalesBM.alertDetalle.textContent = result.mensaje;
                        datosPersonalesBM.cancelar();
                    }
                    else if (Number(result.codigo) >= 400 && Number(result.codigo) <= 499) {
                        // Bad Request
                        datosPersonalesBM.alertContainer.classList.add('alert-warning');
                        datosPersonalesBM.alertTitle.textContent = result.mensaje;
                        datosPersonalesBM.alertDetalle.innerHTML = result.detalles.join(' <br> ');
                    }
                    else {
                        // Error
                        datosPersonalesBM.alertContainer.classList.add('alert-danger');
                        datosPersonalesBM.alertTitle.textContent = result.mensaje;
                        datosPersonalesBM.alertDetalle.textContent = result.detalles.join(' <br> ');
                    }

                    datosPersonalesBM.alertContainer.classList.add('show');
                    datosPersonalesBM.alertContainer.classList.remove('hide');
                })
                .catch((error) => {
                    datosPersonalesBM.spinnerContainer.classList.remove('spinner-grow');
                    datosPersonalesBM.alertContainer.classList.add('alert-danger');
                    datosPersonalesBM.alertTitle.textContent = error.mensaje;
                    datosPersonalesBM.alertDetalle.textContent = error.detalles.join(' <br> ');
                    datosPersonalesBM.alertContainer.classList.add('show');
                    datosPersonalesBM.alertContainer.classList.remove('hide');
                })
                .finally(() => {
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

    cerrarAlerta: function () {
        datosPersonalesBM.alertContainer.classList.remove('show');
        datosPersonalesBM.alertContainer.classList.add('hide');
    },

    cargarEventos: function () {
        datosPersonalesBM.btnDPGuardar.onclick = datosPersonalesBM.guardar;
        datosPersonalesBM.btnDPCancelar.onclick = datosPersonalesBM.cancelar;
        datosPersonalesBM.alertBtnClose.onclick = datosPersonalesBM.cerrarAlerta;
    },

    inicializar: function () {
        datosPersonalesBM.cargarEventos();
    }
};