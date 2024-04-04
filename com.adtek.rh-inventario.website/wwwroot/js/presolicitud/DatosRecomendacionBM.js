const tipoDeCarta = document.getElementById('tipoDeCarta');
const inputPuesto = document.getElementById('puesto');
const inputNombre = document.getElementById('empresa');

tipoDeCarta.addEventListener('change', function () {
    let value = tipoDeCarta.value;

    if (value === 'Laboral') {
        inputPuesto.disabled = false;
        inputNombre.disabled = false;
    } else {
        inputPuesto.disabled = true;
        inputNombre.disabled = true;
    }
});