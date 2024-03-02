let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

const button = document.getElementById("guess-button");

function intentar() {
    if (intentos === 0) {
        return; // Evitar intentos adicionales si ya no hay intentos disponibles
    }

    const INTENTO = leerIntento();

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    let aciertos = 0;

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabra[i]) { //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
            aciertos++;
        } else if (palabra.includes(INTENTO[i])) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else { //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }

        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);

    if (aciertos === palabra.length) {
        terminar("¡GANASTE!");
        return;
    }

    intentos--;
    document.getElementById("attempts").innerText = intentos;

    if (intentos === 0) {
        terminar("¡PERDISTE! La palabra era: " + palabra);
        button.disabled = true; // Deshabilitar el botón después de agotar los intentos
    }
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    const RESULT_MESSAGE = document.getElementById("result-message");

    INPUT.disabled = true;
    BOTON.disabled = true;
    RESULT_MESSAGE.innerText = mensaje;
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    return intento;
}

button.addEventListener("click", intentar);

// Inicializar el número de intentos
document.getElementById("attempts").innerText = intentos;
