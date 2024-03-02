let intentos = 6;
let palabra;

const button = document.getElementById("guess-button");

function obtenerPalabra() {
    const apiUrl = "https://palabras-api.vercel.app/palabras/random";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (typeof data.palabra === 'string' && data.palabra.length > 0) {
                palabra = data.palabra.toUpperCase();
                inicializarJuego();
            } else {
                console.error('Error: Palabra inválida obtenida de la API.');
            }
        })
        .catch(error => console.error('Error al obtener la palabra:', error));
}

function inicializarJuego() {
    const attemptsElement = document.getElementById("attempts");
    if (attemptsElement) {
        attemptsElement.innerText = intentos;
    }

    button.disabled = false;

    const gridElement = document.getElementById("grid");
    if (gridElement) {
        gridElement.innerHTML = "";
    }

    const resultMessageElement = document.getElementById("result-message");
    if (resultMessageElement) {
        resultMessageElement.innerText = "";
    }
}

function intentar() {
    if (intentos === 0 || !palabra) {
        return;
    }

    const INTENTO = leerIntento();

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    let aciertos = 0;

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
            aciertos++;
        } else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }

        ROW.appendChild(SPAN);
    }

    if (GRID) {
        GRID.appendChild(ROW);
    }

    if (aciertos === palabra.length) {
        terminar("¡GANASTE!");
        return;
    }

    intentos--;

    const attemptsElement = document.getElementById("attempts");
    if (attemptsElement) {
        attemptsElement.innerText = intentos;
    }

    if (intentos === 0) {
        terminar("¡PERDISTE! La palabra era: " + palabra);
        button.disabled = true;
    }
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    const RESULT_MESSAGE = document.getElementById("result-message");

    if (INPUT) {
        INPUT.disabled = true;
    }
    if (BOTON) {
        BOTON.disabled = true;
    }
    if (RESULT_MESSAGE) {
        RESULT_MESSAGE.innerText = mensaje;
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento ? intento.value.toUpperCase() : "";
    return intento;
}

button.addEventListener("click", intentar);

window.onload = obtenerPalabra;
