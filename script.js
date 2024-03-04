let intentos = 6;
let lista = ["APPLE", "MOUSE", "HOUSE", "CLASS", "ANGEL", "MONEY", "GHOST"];
let indice = Math.floor(Math.random() * lista.length);
console.log(indice);

let palabra = lista[indice]; //"APPLE";
const button = document.getElementById("guess-button");
const GRID = document.getElementById("grid");

let listado = []; //historico de intentos
let diccionario = { clave: "valor", clave1: "valor1" };
console.log("diccionario", diccionario);
console.log("diccionario2", diccionario["clave1"]);

button.addEventListener("click", intentar);

fetch("https://allow-origin-randperetrm-word-api.herokuapp.com/word?lang=es&length=5")
    .then(response => response.json())
    .then(response => {
        console.log("desde API", response);
        palabra = response[0].toUpperCase();
        console.log(palabra);
    })
    .catch(err => {
        console.log("Ocurrió un error al obtener la palabra de la API. Se utilizará una palabra aleatoria de la lista.");
        palabra = lista[Math.floor(Math.random() * lista.length)];
    });

function intentar() {
    const ROW = document.createElement("div");
    ROW.className = "row";
    console.log(ROW);

    const INTENTO = leerIntento();

    console.log(INTENTO);
    intentos--;

    if (INTENTO === palabra) {
        console.log("Ganaste");
        terminar("<h1>¡GANASTE!😀</h1>");
        return;
    } else {
        console.log("Analizar intento");
        for (let i = 0; i < palabra.length; i++) {
            const SPAN = document.createElement("span");
            SPAN.className = "letter";
            if (palabra[i] === INTENTO[i]) {
                console.log(INTENTO[i], "verde");
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = "green";
            } else if (palabra.includes(INTENTO[i])) {
                console.log(INTENTO[i], "amarillo");
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = "yellow";
            } else {
                console.log(INTENTO[i], "gris");
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = "gray";
            }
            ROW.appendChild(SPAN);
        }
        GRID.appendChild(ROW);
    }
    if (intentos == 0) {
        console.log("Perdiste");
        terminar("<h1>¡PERDISTE!😖</h1>");
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}