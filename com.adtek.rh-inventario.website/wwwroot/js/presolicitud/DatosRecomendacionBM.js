window.addEventListener("load", function () {
    datosRecomendacionBM.inicializar();
});

var URLFetch = "https://localhost:7078/api/DatosRecomendacion";

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
    spinnerContainer: document.querySelector('.spinner-container-dr'),

    tableBody: document.querySelector('.table-body'),

    guardar: function (opcion) {
        if (datosRecomendacionBM.form.checkValidity()) { 

            const reqType = opcion === "guardar" ? "POST" : "PUT";
            
            const body = datosRecomendacionBM.crearBody(opcion);
            const requestOptions = datosRecomendacionBM.generarHeaders(body, reqType);

            datosRecomendacionBM.spinnerContainer.classList.add('spinner-grow');
            datosRecomendacionBM.btnDRGuardar.classList.add('disabled');
            datosRecomendacionBM.btnDRCancelar.classList.add('disabled');

            fetch(`${URLFetch}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {

                    if (Number(result.codigo) >= 200 && Number(result.codigo) <= 299) {

                        //Agrego el nuevo registro a la lista
                        const proxyDR = datosRecomendacionBM.proxiedDR();

                        if (opcion === "actualizar") {
                            proxyDR.list = proxyDR.list.filter(item => item.id !== datosRecomendacionBM.DatosDeRecomendacionFullDto.data.id);
                            this.btnDRGuardar.textContent = 'Guardar';
                        }

                        proxyDR.list = [...proxyDR.list, result.resultado].sort((a, b) => a.id - b.id)
                        //proxyDR.list = proxyDR.list.sort((a, b) => a.id - b.id);                                                                    

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
        const requestOptions = this.generarHeaders(null, "DELETE");

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
                this.cancelar();
            });
    },

    editar: async function (id) {
        datosRecomendacionBM.btnDRGuardar.textContent = 'Actualizar';
        
        await this.obtenerRegistro(id);

        const datosRecomendacion = datosRecomendacionBM.DatosDeRecomendacionFullDto.data;

        if (datosRecomendacion.id > 0) {
            datosRecomendacionBM.txtPersona.value = datosRecomendacion.nombreRecomendador;
            datosRecomendacionBM.txtTelefono.value = datosRecomendacion.telefono;
            datosRecomendacionBM.txtTipoDeCarta.value = datosRecomendacion.tipoCarta;

            if (datosRecomendacion.tipoCarta === 2) {
                datosRecomendacionBM.txtPuesto.value = datosRecomendacion.puesto;
                datosRecomendacionBM.txtEmpresa.value = datosRecomendacion.empresa;
            } else {
                datosRecomendacionBM.txtPuesto.value = '';
                datosRecomendacionBM.txtEmpresa.value = '';
            }

            datosRecomendacionBM.habilitarCamposRecomendacionLaboral();                       
        };
      
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
        datosRecomendacionBM.btnDRGuardar.textContent = 'Guardar';
        datosRecomendacionBM.form.reset();
    },

    cerrarAlertaDR: function () {
        datosRecomendacionBM.alertContainer.classList.remove('show');
        datosRecomendacionBM.alertContainer.classList.add('hide');
    },

    cargarEventos: function () {
        datosRecomendacionBM.btnDRGuardar.onclick = () => {
            const option = datosRecomendacionBM.btnDRGuardar.textContent;
            datosRecomendacionBM.guardar(option.toLowerCase(), null)
        };

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

    /*Proxy para mantener un objeto full de Datos de Recomendacion */
    DatosDeRecomendacionFullDto: function () {
        return {
            name: "datosRecomendacionDTO",
            data: new IDatosRecomendacion,
        }
    },

    // Crea un manejador para el Proxy
    handlerDto: {
        set(target, property, value) {
            target[property] = value;
            return true; 
        }
    },

    // Crea el Proxy
    proxiedDTO: function () {
        return new Proxy(datosRecomendacionBM.DatosDeRecomendacionFullDto, datosRecomendacionBM.handlerDto)
    },

    /*Fin de Proxy para mantener un objeto full de Datos de Recomendacion */

    generarHeaders: function (body, req) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = !body && (req === "GET" || req === "DELETE") ?
            {
                method: req,
                headers: myHeaders,
                redirect: "follow"
            }
            : body && (req === "POST" || req === "PUT") ?
            {
                method: req,
                headers: myHeaders,
                body,
                redirect: "follow"
            } : null;

        return requestOptions;
    },

    crearBody: function (opcion) {

        if (opcion === "guardar") {
            return JSON.stringify({
                "nombreRecomendador": datosRecomendacionBM.txtPersona.value,
                "telefono": datosRecomendacionBM.txtTelefono.value,
                "tipoCarta": datosRecomendacionBM.txtTipoDeCarta.value,
                "puesto": datosRecomendacionBM.txtTipoDeCarta.value === "2" ? datosRecomendacionBM.txtPuesto.value : "empty",
                "empresa": datosRecomendacionBM.txtTipoDeCarta.value === "2" ? datosRecomendacionBM.txtEmpresa.value : "empty",
            });
        }

        return JSON.stringify({
            "id": datosRecomendacionBM.DatosDeRecomendacionFullDto.data.id,
            "nombreRecomendador": datosRecomendacionBM.txtPersona.value,
            "telefono": datosRecomendacionBM.txtTelefono.value,
            "tipoCarta": datosRecomendacionBM.txtTipoDeCarta.value,
            "puesto": datosRecomendacionBM.txtTipoDeCarta.value === "2" ? datosRecomendacionBM.txtPuesto.value : "empty",
            "empresa": datosRecomendacionBM.txtTipoDeCarta.value === "2" ? datosRecomendacionBM.txtEmpresa.value : "empty",
            "fechaCreacion": datosRecomendacionBM.DatosDeRecomendacionFullDto.data.fechaCreacion,
            "usuarioCreacion": datosRecomendacionBM.DatosDeRecomendacionFullDto.data.usuarioCreacion,
            "fechaModificacion": new Date(),
            "usuarioModificacion": "Adtek"
        });
    },

    obtenerRegistros: function () {
        const requestOptions = this.generarHeaders(null, "GET");

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

    obtenerRegistro: async function (id) {
        let datosRecomendacion = new IDatosRecomendacion();

        const requestOptions = this.generarHeaders(null, "GET");

        try {
            const response = await fetch(`${URLFetch}/${id}`, requestOptions);
            const result = await response.json();

            if (result.codigo >= 200 && result.codigo <= 299) {
                datosRecomendacion = result.resultado;

                const proxyDTO = datosRecomendacionBM.proxiedDTO();
                proxyDTO.data = datosRecomendacion;

            } else {
                alert.mostrar(datosRecomendacionBM.alertContainer, datosRecomendacionBM.cancelar, result);
            }
        } catch (error) {
            console.log("error", error);
        }
    },

    inicializar: function () {
        datosRecomendacionBM.cargarEventos();
        datosRecomendacionBM.obtenerRegistros();
    }
};