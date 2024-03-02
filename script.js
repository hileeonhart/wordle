
let intentos = 6;
let palabra;

const button = document.getElementById("guess-button");

function obtenerPalabra() {
    const apiUrl = "https://palabras-api.vercel.app/palabras/random";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.palabra && typeof data.palabra === 'string' && data.palabra.length > 0) {
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
    const gridElement = document.getElementById("grid");
    const resultMessageElement = document.getElementById("result-message");

    if (attemptsElement && gridElement && resultMessageElement) {
        attemptsElement.innerText = intentos;
        button.disabled = false;
        gridElement.innerHTML = "";
        resultMessageElement.innerText = "";
    } else {
        console.error('Error: No se encontraron elementos HTML necesarios.');
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

    GRID.appendChild(ROW);

    if (aciertos === palabra.length) {
        terminar("¡GANASTE!");
        return;
    }

    intentos--;
    const attemptsElement = document.getElementById("attempts");

    if (attemptsElement) {
        attemptsElement.innerText = intentos;
    } else {
        console.error('Error: No se encontró el elemento "attempts".');
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

    if (INPUT && BOTON && RESULT_MESSAGE) {
        INPUT.disabled = true;
        BOTON.disabled = true;
        RESULT_MESSAGE.innerText = mensaje;
    } else {
        console.error('Error: No se encontraron elementos HTML necesarios.');
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    return intento;
}

button.addEventListener("click", intentar);

window.onload = obtenerPalabra;