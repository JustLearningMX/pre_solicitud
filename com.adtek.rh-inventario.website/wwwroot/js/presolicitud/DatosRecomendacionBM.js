window.addEventListener("load", function () {
    datosRecomendacionBM.inicializar();
});

var URLFetch = "https://localhost:7078/api/DatosRecomendacion";

const datosRecomendacionBM = {
    
    form: document.getElementById('formDatosRecomendacion'),

    btnDRGuardar: document.getElementById('btnDRGuardar'),
    btnDRCancelar: document.getElementById('btnDRCancelar'),
    //btnDelete: document.getElementById('btn-delete'),

    txtPersona: document.getElementById('persona'),
    txtTelefono: document.getElementById('telContacto'),
    txtTipoDeCarta: document.getElementById('tipoDeCarta'),
    txtPuesto: document.getElementById('puesto'),
    txtEmpresa: document.getElementById('empresa'),

    alertContainer: document.querySelector('.alert-dr'),
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

            fetch(`${URLFetch}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {

                    if (Number(result.codigo) >= 200 && Number(result.codigo) <= 299) {

                        //Agrego el nuevo registro a la lista
                        const proxyDR = datosRecomendacionBM.proxiedDR();
                        proxyDR.list = [...proxyDR.list, result.resultado];

                    }

                    alert.mostrar(datosRecomendacionBM.alertContainer, datosRecomendacionBM.cancelar, result);
                    
                })
                .catch((error) => {
                    alert.mostrarError(datosRecomendacionBM.alertContainer, error);
                })
                .finally(() => {
                    datosRecomendacionBM.spinnerContainer.classList.remove('spinner-grow');
                    datosRecomendacionBM.btnDRGuardar.classList.remove('disabled');
                    datosRecomendacionBM.btnDRCancelar.classList.remove('disabled');
                });
        }

        datosRecomendacionBM.form.classList.add('was-validated');

    },

    eliminar: function (id) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        datosRecomendacionBM.spinnerContainer.classList.add('spinner-grow');
        datosRecomendacionBM.btnDRGuardar.classList.add('disabled');
        datosRecomendacionBM.btnDRCancelar.classList.add('disabled');

        fetch(`${URLFetch}/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                if (Number(result.codigo) >= 200 && Number(result.codigo) <= 299) {

                    //Elimino el registro de la lista
                    const proxyDR = datosRecomendacionBM.proxiedDR();
                    proxyDR.list = proxyDR.list.filter(item => item.id !== id);

                }

                alert.mostrar(datosRecomendacionBM.alertContainer, datosRecomendacionBM.cancelar, result);

            })
            .catch((error) => {
                alert.mostrarError(datosRecomendacionBM.alertContainer, error);
            })
            .finally(() => {
                datosRecomendacionBM.spinnerContainer.classList.remove('spinner-grow');
                datosRecomendacionBM.btnDRGuardar.classList.remove('disabled');
                datosRecomendacionBM.btnDRCancelar.classList.remove('disabled');
            });
    },

    editar: function (id) {
        console.log(`Editando registro ${id}`);
        const datosRecomendacion = this.obtenerRegistro(id);

        console.log(datosRecomendacion);
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
    },

    /* Proxi para manejar la lista */

    listadoDatosDeRecomendacion: function () {
        return {
            name: "datosRecomendacion",
            list: []
        }
    },

    // Crea un manejador para el Proxy
    handler: {       
        set(target, property, value) {
            target[property] = value;
            if (property === 'list') {
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
                    <button id="btn-edit" type="button" class="btn btn-outline-secondary">Editar</button>
                    <button id="btn-delete" type="button" class="btn btn-outline-danger">Eliminar</button>
                </td>
            `;

            const deleteButton = row.querySelector('#btn-delete');
            deleteButton.addEventListener('click', () => this.eliminar(item.id));

            const editButton = row.querySelector('#btn-edit');
            editButton.addEventListener('click', () => this.editar(item.id));

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

        fetch(`${URLFetch}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.codigo >= 200 && result.codigo <= 299 && result.resultado.length > 0) {
                    const tableBody = document.querySelector('#table-list');
                    const messageTable = document.querySelector('#message-table-dr');

                    tableBody.classList.remove('hide');
                    messageTable.classList.remove('d-flex');
                    messageTable.classList.add('hide');

                    datosRecomendacionBM.updateList(result.resultado);

                    const proxyDR = datosRecomendacionBM.proxiedDR();
                    proxyDR.list = [...result.resultado];
                }
            })
            .catch((error) => console.log("error", error));
    },

    obtenerRegistro: function (id) {
        const datosRecomendacion = new IDatosRecomendacion();
        console.log(datosRecomendacion);

        datosRecomendacion.id = 15;

        /*const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${URLFetch}/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.codigo >= 200 && result.codigo <= 299 && result.resultado.length > 0) {
                    DATOS_RECOMENDACION = result.resultado;
                } else {
                    alert.mostrar(datosRecomendacionBM.alertContainer, datosRecomendacionBM.cancelar, result);
                }
            })
            .catch((error) => console.log("error", error));*/

        return datosRecomendacion
    },

    inicializar: function () {
        datosRecomendacionBM.cargarEventos();
        datosRecomendacionBM.obtenerRegistros();
    }
};