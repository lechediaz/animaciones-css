
const crearCard = (inicio, fin, limite) => {
    let html = '';

    for (let i = inicio; i < fin; i++) {
        html += `<div class="card c${i}">${i <= limite ? i : ''}</div>`
    }

    return html;
};

const llenarRueda = (rueda, inicio, limite) => {
    let rueda_tag = document.getElementById(rueda);
    let html = crearCard(inicio, 10, limite) + crearCard(0, inicio, limite);

    rueda_tag.innerHTML = html;
};

const crearReloj = () => {
    const fecha_actual = new Date();
    let hours_1 = Math.floor(fecha_actual.getHours() / 10);
    let hours_2 = fecha_actual.getHours() - (hours_1 * 10);
    let minutes_1 = Math.floor(fecha_actual.getMinutes() / 10);
    let minutes_2 = fecha_actual.getMinutes() - (minutes_1 * 10);
    let seconds_1 = Math.floor(fecha_actual.getSeconds() / 10);
    let seconds_2 = fecha_actual.getSeconds() - (seconds_1 * 10);

    llenarRueda('hours1', hours_1, 2);
    llenarRueda('hours2', hours_2, 9);
    llenarRueda('minutes1', minutes_1, 5);
    llenarRueda('minutes2', minutes_2, 9);
    llenarRueda('seconds1', seconds_1, 5);
    llenarRueda('seconds2', seconds_2, 9);

    horas_veinte = fecha_actual.getHours() >= 20;
}

const mostrarCards = (rueda, inicio, fin, mostrar) => {
    fin++;
    const rueda_tag = document.getElementById(rueda);

    for (let i = inicio; i < fin; i++) {
        rueda_tag.getElementsByClassName(`c${i}`)[0].textContent = mostrar ? i : '';
    }
}

// Ejecución
let horas_veinte = false;

crearReloj();

setInterval(() => {
    const fecha_actual = new Date();

    if (fecha_actual.getHours() >= 20) {
        if (!horas_veinte) {
            horas_veinte = true;
            mostrarCards('hours2', 4, 9, false);
        }
    } else {
        if (horas_veinte) {
            horas_veinte = false;
            mostrarCards('hours2', 4, 9, true);
        }
    }
}, 1000);