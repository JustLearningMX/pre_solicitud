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

    alertContainer: document.querySelector('.alert-dr'),
    alertBtnClose: document.querySelector('#alert-close-dr'),
    alertTitle: document.querySelector('.alert-title-dr'),
    alertDetalle: document.querySelector('.alert-detalle-dr'),
    spinnerContainer: document.querySelector('.spinner-container-dr'),

    tableBody: document.querySelector('.table-body'),

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

            datosRecomendacionBM.spinnerContainer.classList.add('spinner-grow');
            datosRecomendacionBM.btnDRGuardar.classList.add('disabled');
            datosRecomendacionBM.btnDRCancelar.classList.add('disabled');

            fetch("https://localhost:7078/api/DatosRecomendacion", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    datosRecomendacionBM.alertContainer.classList.remove('alert-success', 'alert-warning', 'alert-danger');
                    datosRecomendacionBM.spinnerContainer.classList.remove('spinner-grow');

                    if (Number(result.codigo) >= 200 && Number(result.codigo) <= 299) {
                        // OK
                        datosRecomendacionBM.alertContainer.classList.add('alert-success');
                        datosRecomendacionBM.alertTitle.textContent = "Informacion guardada";
                        datosRecomendacionBM.alertDetalle.textContent = result.mensaje;

                        //Agrego el nuevo registro a la lista
                        const proxyDR = datosRecomendacionBM.proxiedDR();
                        proxyDR.list = [...proxyDR.list, result.resultado];

                        datosRecomendacionBM.cancelar();
                    }
                    else if (Number(result.codigo) >= 400 && Number(result.codigo) <= 499) {
                        // Bad Request
                        datosRecomendacionBM.alertContainer.classList.add('alert-warning');
                        datosRecomendacionBM.alertTitle.textContent = result.mensaje;
                        datosRecomendacionBM.alertDetalle.innerHTML = result.detalles.join(' <br> ');
                    }
                    else {
                        // Error
                        datosRecomendacionBM.alertContainer.classList.add('alert-danger');
                        datosRecomendacionBM.alertTitle.textContent = result.mensaje;
                        datosRecomendacionBM.alertDetalle.textContent = result.detalles.join(' <br> ');
                    }

                    datosRecomendacionBM.alertContainer.classList.add('show');
                    datosRecomendacionBM.alertContainer.classList.remove('hide');
                })
                .catch((error) => {
                    datosRecomendacionBM.spinnerContainer.classList.remove('spinner-grow');
                    datosRecomendacionBM.alertContainer.classList.add('alert-danger');
                    datosRecomendacionBM.alertTitle.textContent = error.mensaje;
                    datosRecomendacionBM.alertDetalle.textContent = error.detalles.join(' <br> ');
                    datosRecomendacionBM.alertContainer.classList.add('show');
                    datosRecomendacionBM.alertContainer.classList.remove('hide');
                })
                .finally(() => {
                    datosRecomendacionBM.btnDRGuardar.classList.remove('disabled');
                    datosRecomendacionBM.btnDRCancelar.classList.remove('disabled');
                });
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

    cerrarAlertaDR: function () {
        datosRecomendacionBM.alertContainer.classList.remove('show');
        datosRecomendacionBM.alertContainer.classList.add('hide');
    },

    cargarEventos: function () {
        datosRecomendacionBM.btnDRGuardar.onclick = datosRecomendacionBM.guardar;
        datosRecomendacionBM.txtTipoDeCarta.onchange = datosRecomendacionBM.habilitarCamposRecomendacionLaboral;
        datosRecomendacionBM.btnDRCancelar.onclick = datosRecomendacionBM.cancelar;
        datosRecomendacionBM.alertBtnClose.onclick = datosRecomendacionBM.cerrarAlertaDR;
    },

    /* Proxi para manejar la lista */

    /*listadoDatosDeRecomendacion: function () {
        return {
            name: "datosRecomendacion",
            list: []
        }
    },*/
    listadoDatosDeRecomendacion: {
            name: "datosRecomendacion",
            list: []      
    },

    // Crea un manejador para el Proxy
    handler: {       
        set(target, property, value) {
            target[property] = value;
            if (property === 'list') {
                console.log(`${property}: `);
                console.log(value);
                datosRecomendacionBM.updateList(value);
            }
            return true; // Indica que la operación se realizó con éxito
        }
    },

    // Crea el Proxy
    proxiedDR: function () {
        return new Proxy(datosRecomendacionBM.listadoDatosDeRecomendacion, datosRecomendacionBM.handler)
    },

    // Función para actualizar la lista en la interfaz de usuario
    updateList: function (items) {
        datosRecomendacionBM.clearList();

        items.forEach(item => {
            const row = document.createElement('tr');
            const tipoCarta = Number(item.tipoCarta) === 1 ? 'Personal' : 'Laboral';

            row.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${tipoCarta}</td>
                <td>${item.nombreRecomendador}</td>
                <td>${item.telefono}</td>
                <td>
                    <button type="button" class="btn btn-outline-secondary">Editar</button>
                    <button type="button" class="btn btn-outline-danger">Eliminar</button>
                </td>
            `;
            datosRecomendacionBM.tableBody.appendChild(row);
        });
    },

    // Función para limpiar la lista
    clearList: function () {
        datosRecomendacionBM.tableBody.innerHTML = '';
    },

    /*Fin de Proxi para manejar la lista */

    obtenerRegistros: function () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://localhost:7078/api/DatosRecomendacion", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.resultado.length > 0) {
                    datosRecomendacionBM.updateList(result.resultado);

                    const proxyDR = datosRecomendacionBM.proxiedDR();
                    proxyDR.list = [...result.resultado];
                }
            })
            .catch((error) => console.log("error", error));
    },



    inicializar: function () {
        datosRecomendacionBM.cargarEventos();
        datosRecomendacionBM.obtenerRegistros();
    }
};