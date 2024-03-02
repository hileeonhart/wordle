let intentos = 6;
let palabra;

const button = document.getElementById("guess-button");

function obtenerPalabra() {
    const apiUrl = "https://palabras-api.vercel.app/palabras/random";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Verificar que 'data.palabra' sea una cadena no vacía
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
    attemptsElement.innerText = intentos;

    button.disabled = false;

    document.getElementById("grid").innerHTML = "";

    document.getElementById("result-message").innerText = "";
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
    document.getElementById("attempts").innerText = intentos;

    if (intentos === 0) {
        terminar("¡PERDISTE! La palabra era: " + palabra);
        button.disabled = true;
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

window.onload = obtenerPalabra;