const reloj = (() => {
    let horas_veinte = false;

    const llenarRueda = (rueda, limite) => {
        let rueda_tag = document.getElementById(rueda);
        let html = '';

        for (let i = 0; i < 10; i++) {
            html += `<div class="card c${i}">${i <= limite ? i : ''}</div>`
        }

        rueda_tag.innerHTML = html;
    };

    const rotarRueda = (rueda, digito) => {
        let rueda_tag = document.getElementById(rueda);
        let angulo = digito * 36;
        const angulo_actual = parseInt(rueda_tag.dataset.angulo_actual || 0);
        const rotaciones = Math.floor(angulo_actual / 360);

        // console.log({
        //     digito,
        //     angulo,
        //     angulo_actual,
        //     rotaciones
        // })

        if ((angulo_actual - 360 * rotaciones) !== angulo) {
            const nuevo_angulo = angulo === 0 ? 360 * (rotaciones + 1) : (360 * rotaciones + angulo);
            rueda_tag.style.transform = `rotateX(-${nuevo_angulo}deg)`;
            rueda_tag.dataset.angulo_actual = nuevo_angulo;
        }
    }

    const mostrarCards = (rueda, inicio, fin, mostrar) => {
        const rueda_tag = document.getElementById(rueda);

        for (let i = inicio; i <= fin; i++) {
            rueda_tag.getElementsByClassName(`c${i}`)[0].textContent = mostrar ? i : '';
        }
    }

    const tickTack = () => {
        const fecha_actual = new Date();
        let hours_1 = Math.floor(fecha_actual.getHours() / 10);
        let hours_2 = fecha_actual.getHours() % 10;
        let minutes_1 = Math.floor(fecha_actual.getMinutes() / 10);
        let minutes_2 = fecha_actual.getMinutes() % 10;
        let seconds_1 = Math.floor(fecha_actual.getSeconds() / 10);
        let seconds_2 = fecha_actual.getSeconds() % 10;

        // Ocultar dígitos del 4 al 9 en decenas de hora desde las 20 horas hasta las 0 horas
        if (fecha_actual.getHours() >= 20) {
            if (!horas_veinte) {
                mostrarCards('hours2', 4, 9, false);
            }

            horas_veinte = true;
        } else {
            if (horas_veinte) {
                mostrarCards('hours2', 4, 9, true);
            }

            horas_veinte = false;
        }

        // console.log({
        //     hours_1,
        //     hours_2,
        //     minutes_1,
        //     minutes_2,
        //     seconds_1,
        //     seconds_2
        // });

        rotarRueda('hours1', hours_1);
        rotarRueda('hours2', hours_2);
        rotarRueda('minutes1', minutes_1);
        rotarRueda('minutes2', minutes_2);
        rotarRueda('seconds1', seconds_1);
        rotarRueda('seconds2', seconds_2);
    }

    const crearReloj = () => {
        llenarRueda('hours1', 2);
        llenarRueda('hours2', 9);
        llenarRueda('minutes1', 5);
        llenarRueda('minutes2', 9);
        llenarRueda('seconds1', 5);
        llenarRueda('seconds2', 9);

        tickTack();
    }

    crearReloj();
    setInterval(tickTack, 1000);
})();