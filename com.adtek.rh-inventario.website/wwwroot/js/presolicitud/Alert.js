const alert = {
    mostrar: function (alertContainer, cancelar, result) {
        alertContainer.classList.remove('alert-success', 'alert-warning', 'alert-danger');

        let alertTitle = alertContainer.querySelector('.alert-title');
        let alertDetalle = alertContainer.querySelector('.alert-detalle');
        const alertBtnClose = alertContainer.querySelector('#alert-close');

        if (Number(result.codigo) >= 200 && Number(result.codigo) <= 299) {
            // OK
            alertContainer.classList.add('alert-success');
            alertTitle.textContent = "Procedimiento exitoso";
            alertDetalle.textContent = result.mensaje;
            cancelar();
        }
        else if (Number(result.codigo) >= 400 && Number(result.codigo) <= 499) {
            // Bad Request
            alertContainer.classList.add('alert-warning');
            alertTitle.textContent = result.mensaje;
            alertDetalle.innerHTML = result.detalles.join(' <br> ');
        }
        else {
            // Error
            alertContainer.classList.add('alert-danger');
            alertTitle.textContent = result.mensaje;
            alertDetalle.textContent = result.detalles.join(' <br> ');
        }

        alertContainer.classList.add('show');
        alertContainer.classList.remove('hide');

        alertBtnClose.addEventListener('click', () => this.cerrarAlerta(alertContainer));
    },

    mostrarError: function (alertContainer, error) {
        alertContainer.classList.remove('alert-success', 'alert-warning', 'alert-danger');
        alertContainer.classList.add('alert-danger');

        const alertBtnClose = alertContainer.querySelector('#alert-close');
        alertBtnClose.addEventListener('click', () => this.cerrarAlerta(alertContainer));

        const alertTitle = alertContainer.querySelector('.alert-title');
        const alertDetalle = alertContainer.querySelector('.alert-detalle');

        alertTitle.textContent = "Ocurrio un error inesperado";
        alertDetalle.textContent = "Por favor, intente de nuevo mas tarde."

        alertContainer.classList.add('show');
        alertContainer.classList.remove('hide');

        console.error(error);
    },

    cerrarAlerta: function (alertContainer) {
        alertContainer.classList.remove('show');
        alertContainer.classList.add('hide');
    },
};